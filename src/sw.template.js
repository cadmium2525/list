'use strict';
const SCOPE = self.registration.scope;
const CACHE_PREFIX = 'cadmium-gallery-' + encodeURIComponent(new URL(SCOPE).pathname) + '-';
const CACHE_NAME = CACHE_PREFIX + '__CACHE_VERSION__';
const PRECACHE = __PRECACHE_ASSETS__;
const INDEX_URL = new URL('index.html', SCOPE).href;
const BASE_PATH = new URL(SCOPE).pathname;
const precacheUrls = new Set(PRECACHE.map(path => new URL(path, SCOPE).href));

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE.map(path => new Request(new URL(path, SCOPE), {cache:'reload'})))));
  // An existing tab continues with its current version until it is closed.
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    await Promise.all((await caches.keys()).filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== new URL(SCOPE).origin || !url.pathname.startsWith(BASE_PATH)) return;
  if (request.mode === 'navigate' && (url.pathname === BASE_PATH || url.href.split('?')[0] === INDEX_URL)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(INDEX_URL, response.clone());
        if (response.ok) return response;
        return (await cache.match(INDEX_URL)) || response;
      } catch {
        return (await cache.match(INDEX_URL)) || Response.error();
      }
    })());
    return;
  }
  if (!precacheUrls.has(url.href.split('?')[0])) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(url.href.split('?')[0]);
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok) await cache.put(url.href.split('?')[0], response.clone());
    return response;
  })());
});
