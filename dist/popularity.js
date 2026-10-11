(() => {
  'use strict';
  const config = window.CADMIUM_POPULARITY_CONFIG || {};
  const slugs = (window.CADMIUM_PROJECTS || []).map(project => project.slug);
  const knownSlugs = new Set(slugs);
  const enabled = typeof config.projectId === 'string' && /^[a-z0-9-]+$/.test(config.projectId) && typeof config.apiKey === 'string' && config.apiKey.length > 20;
  const keyPrefix = 'cadmium-popularity-v1:' + config.projectId + ':';
  const database = 'projects/' + config.projectId + '/databases/(default)';
  const documents = database + '/documents';
  const endpoint = 'https://firestore.googleapis.com/v1/' + documents;
  const listeners = new Set();
  const pendingOpens = new Map();
  const confirmedCounts = new Map();
  let loadPromise = null;
  let authPromise = null;
  let clockOffset = 0;
  let auth = readStored('auth');
  let seen = readStored('seen') || {};
  const cached = readStored('counts');
  let state = {status: enabled ? 'loading' : 'unavailable', counts: null, updatedAt: null};

  function readStored(name) {
    try { return JSON.parse(window.localStorage.getItem(keyPrefix + name)); }
    catch (_) { return null; }
  }
  function store(name, value) {
    try { window.localStorage.setItem(keyPrefix + name, JSON.stringify(value)); }
    catch (_) { /* Private browsing can still use the live counter. */ }
  }
  function validCounts(counts) {
    return counts && typeof counts === 'object' && slugs.every(slug => Number.isSafeInteger(counts[slug]) && counts[slug] >= 0);
  }
  function snapshot() {
    return {...state, counts: state.counts ? {...state.counts} : null};
  }
  function publish(next) {
    state = next;
    for (const listener of listeners) {
      try { listener(snapshot()); } catch (_) { /* A view must not interrupt recording. */ }
    }
  }
  if (enabled && cached && cached.version === 1 && validCounts(cached.counts) && typeof cached.updatedAt === 'string' && Number.isFinite(Date.parse(cached.updatedAt))) {
    state = {status: 'cached', counts: {...cached.counts}, updatedAt: cached.updatedAt};
  }
  function rememberCounts(counts, updatedAt) {
    store('counts', {version: 1, counts, updatedAt});
    publish({status: 'live', counts, updatedAt});
  }
  function online() { return window.navigator?.onLine !== false; }
  // Shift before rounding so the receipt date changes at midnight in Japan.
  function today() { return String(Math.floor((Date.now() + clockOffset + 9 * 3600000) / 86400000) * 86400000); }
  async function request(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await window.fetch(url, {...options, signal: controller.signal, credentials: 'omit', cache: 'no-store'});
      const serverTime = Date.parse(response.headers.get('date'));
      if (Number.isFinite(serverTime)) clockOffset = serverTime - Date.now();
      const body = await response.json();
      if (!response.ok) {
        const error = new Error('Popularity request failed');
        error.status = response.status;
        error.code = body?.error?.message || body?.error?.status || '';
        throw error;
      }
      return body;
    } finally { clearTimeout(timeout); }
  }
  async function loadCounts() {
    const counts = Object.fromEntries(slugs.map(slug => [slug, 0]));
    let pageToken = '';
    const visited = new Set();
    do {
      const url = new URL(endpoint + '/galleryPopularity/v1/projects');
      url.searchParams.set('pageSize', '100');
      if (pageToken) url.searchParams.set('pageToken', pageToken);
      const body = await request(url.href);
      if (body.documents != null && !Array.isArray(body.documents)) throw new Error('Invalid popularity snapshot');
      for (const doc of body.documents || []) {
        const slug = doc.name?.split('/').pop();
        if (!knownSlugs.has(slug)) continue;
        const raw = doc.fields?.count?.integerValue;
        if (typeof raw !== 'string' || !/^\d+$/.test(raw) || !Number.isSafeInteger(Number(raw))) throw new Error('Invalid popularity count');
        counts[slug] = Math.max(Number(raw), confirmedCounts.get(slug) || 0);
      }
      pageToken = body.nextPageToken || '';
      if (pageToken && (typeof pageToken !== 'string' || visited.has(pageToken))) throw new Error('Invalid popularity page');
      visited.add(pageToken);
    } while (pageToken);
    for (const [slug, count] of confirmedCounts) counts[slug] = Math.max(counts[slug], count);
    rememberCounts(counts, new Date(Date.now()).toISOString());
  }
  function start() {
    if (loadPromise) return loadPromise;
    if (!enabled || !online()) {
      publish({...state, status: state.counts ? 'cached' : 'unavailable'});
      return Promise.resolve(false);
    }
    loadPromise = loadCounts().then(() => true).catch(() => {
      publish({...state, status: state.counts ? 'cached' : 'unavailable'});
      return false;
    }).finally(() => { loadPromise = null; });
    return loadPromise;
  }
  function saveAuth(body, refreshed = false) {
    const next = {
      uid: refreshed ? body.user_id : body.localId,
      idToken: refreshed ? body.id_token : body.idToken,
      refreshToken: refreshed ? body.refresh_token : body.refreshToken,
      expiresAt: Date.now() + Number(refreshed ? body.expires_in : body.expiresIn) * 1000 - 60000
    };
    if (!/^[A-Za-z0-9]+$/.test(next.uid || '') || typeof next.idToken !== 'string' || typeof next.refreshToken !== 'string' || !Number.isFinite(next.expiresAt)) throw new Error('Invalid anonymous session');
    auth = next;
    store('auth', auth);
    return auth;
  }
  async function authenticate() {
    if (auth && typeof auth.uid === 'string' && auth.idToken && auth.expiresAt > Date.now()) return auth;
    if (auth?.refreshToken) {
      try {
        const body = await request('https://securetoken.googleapis.com/v1/token?key=' + encodeURIComponent(config.apiKey), {
          method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: new URLSearchParams({grant_type: 'refresh_token', refresh_token: auth.refreshToken}).toString()
        });
        return saveAuth(body, true);
      } catch (error) {
        if (error.status !== 400 || !/^(TOKEN_EXPIRED|INVALID_REFRESH_TOKEN|USER_NOT_FOUND)$/.test(error.code)) throw error;
        auth = null;
      }
    }
    return saveAuth(await request('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + encodeURIComponent(config.apiKey), {
      method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({returnSecureToken: true})
    }));
  }
  function session() {
    if (!authPromise) authPromise = authenticate().finally(() => { authPromise = null; });
    return authPromise;
  }
  function receiptName(slug, uid, day) {
    return documents + '/galleryPopularity/v1/receipts/' + day + '/opens/' + slug + '_' + uid;
  }
  function rememberOpen(slug, day) {
    seen = Object.fromEntries(Object.entries(seen).filter(([key, value]) => knownSlugs.has(key) && value === day));
    seen[slug] = day;
    store('seen', seen);
  }
  async function record(slug) {
    if (!enabled || !knownSlugs.has(slug) || !online()) return false;
    try {
      const identity = await session();
      const day = today();
      if (seen[slug] === day) return false;
      const receipt = receiptName(slug, identity.uid, day);
      const headers = {'Content-Type': 'application/json', Authorization: 'Bearer ' + identity.idToken};
      const body = {writes: [
        {
          update: {name: documents + '/galleryPopularity/v1/projects/' + slug, fields: {}},
          updateMask: {fieldPaths: []},
          updateTransforms: [{fieldPath: 'count', increment: {integerValue: '1'}}, {fieldPath: 'updatedAt', setToServerValue: 'REQUEST_TIME'}]
        },
        {
          update: {name: receipt, fields: {slug: {stringValue: slug}, uid: {stringValue: identity.uid}}},
          updateTransforms: [{fieldPath: 'openedAt', setToServerValue: 'REQUEST_TIME'}],
          currentDocument: {exists: false}
        }
      ]};
      let result;
      try {
        result = await request(endpoint + ':commit', {method: 'POST', headers, body: JSON.stringify(body), keepalive: true});
      } catch (error) {
        // Another tab may have already counted this browser today. Check only
        // this anonymous user's receipt; never read someone else's receipts.
        if (error.status === 403 || error.status === 409) {
          const existing = await request('https://firestore.googleapis.com/v1/' + receipt, {headers: {Authorization: headers.Authorization}});
          if (existing.fields?.uid?.stringValue === identity.uid && existing.fields?.slug?.stringValue === slug && existing.fields?.openedAt?.timestampValue) {
            rememberOpen(slug, day);
            return false;
          }
        }
        throw error;
      }
      const raw = result.writeResults?.[0]?.transformResults?.[0]?.integerValue;
      if (typeof raw !== 'string' || !/^\d+$/.test(raw) || !Number.isSafeInteger(Number(raw))) throw new Error('Invalid recorded count');
      confirmedCounts.set(slug, Number(raw));
      rememberOpen(slug, day);
      if (state.counts && state.status === 'live') {
        rememberCounts({...state.counts, [slug]: Math.max(state.counts[slug], Number(raw))}, result.commitTime || new Date(Date.now()).toISOString());
      } else await start();
      return true;
    } catch (_) { return false; /* Opening a work never depends on its counter. */ }
  }
  function recordOpen(slug) {
    if (!knownSlugs.has(slug)) return Promise.resolve(false);
    if (pendingOpens.has(slug)) return pendingOpens.get(slug);
    const pending = record(slug).finally(() => { pendingOpens.delete(slug); });
    pendingOpens.set(slug, pending);
    return pending;
  }
  window.CADMIUM_POPULARITY = {
    getState: snapshot,
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    start,
    recordOpen
  };
  window.addEventListener('online', () => { start(); });
  window.addEventListener('offline', () => { publish({...state, status: state.counts ? 'cached' : 'unavailable'}); });
})();
