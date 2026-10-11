import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
const source = await fs.readFile(new URL('../dist/popularity.js', import.meta.url), 'utf8');
const prefix = 'cadmium-popularity-v1:test-gallery:';
const dayMs = 86400000;
const initialTime = Date.parse('2026-10-11T14:59:00Z');
const config = {projectId: 'test-gallery', apiKey: 'public-web-key-for-a-test-not-a-secret'};
const projects = [{slug: 'one'}, {slug: 'two'}];
function response(body, status = 200) {
  return new Response(JSON.stringify(body), {status, headers: {'Content-Type': 'application/json'}});
}
function document(slug, count) {
  return {name: 'projects/test-gallery/databases/(default)/documents/galleryPopularity/v1/projects/' + slug, fields: {count: {integerValue: String(count)}}};
}
function setup(handler, stored = {}, enabled = true) {
  const storage = new Map(Object.entries(stored).map(([key, value]) => [prefix + key, JSON.stringify(value)]));
  const calls = [], handlers = new Map();
  let now = initialTime;
  class Clock extends Date { static now() { return now; } }
  const window = {
    CADMIUM_PROJECTS: projects, CADMIUM_POPULARITY_CONFIG: enabled ? config : {},
    navigator: {onLine: true},
    localStorage: {getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value)},
    addEventListener: (event, handler) => handlers.set(event, handler),
    fetch: async (url, options) => { calls.push({url, options}); return handler(url, options, calls); }
  };
  vm.runInNewContext(source, {window, Date: Clock, URL, URLSearchParams, AbortController, setTimeout, clearTimeout});
  return {api: window.CADMIUM_POPULARITY, window, calls, storage, handlers, advance: amount => { now += amount; }};
}
const snapshot = counts => ({version: 1, counts, updatedAt: '2026-10-10T08:00:00Z'});
const signup = () => response({localId: 'anonymousUser1', idToken: 'browser-id-token', refreshToken: 'browser-refresh-token', expiresIn: '3600'});
const commit = count => response({writeResults: [{transformResults: [{integerValue: String(count)}, {timestampValue: '2026-10-11T14:59:00Z'}]}, {}], commitTime: '2026-10-11T14:59:00Z'});

test('loads shared counts and treats only missing documents as zero without signing visitors in', async () => {
  const app = setup(() => response({documents: [document('two', 8)]}));
  assert.equal(await app.api.start(), true);
  const state = app.api.getState();
  assert.equal(state.status, 'live');
  assert.deepEqual({...state.counts}, {one: 0, two: 8});
  assert.equal(app.calls.length, 1);
  assert.match(app.calls[0].url, /\/galleryPopularity\/v1\/projects\?pageSize=100$/);
  assert.equal(app.calls[0].options.credentials, 'omit');
});
test('offline sorting uses a shared cached snapshot and never records a local popularity score', async () => {
  const app = setup(() => { throw new Error('must not fetch offline'); }, {counts: snapshot({one: 4, two: 9})});
  app.window.navigator.onLine = false;
  assert.equal(await app.api.start(), false);
  assert.equal(await app.api.recordOpen('one'), false);
  assert.equal(app.api.getState().status, 'cached');
  assert.deepEqual({...app.api.getState().counts}, {one: 4, two: 9});
  assert.equal(app.calls.length, 0);
});
test('failed or malformed snapshots do not fabricate popularity counts', async () => {
  const empty = setup(() => response({error: {message: 'UNAVAILABLE'}}, 503));
  assert.equal(await empty.api.start(), false);
  assert.equal(empty.api.getState().status, 'unavailable');
  assert.equal(empty.api.getState().counts, null);
  const cached = setup(() => response({documents: [document('one', -1)]}), {counts: snapshot({one: 4, two: 9})});
  assert.equal(await cached.api.start(), false);
  assert.equal(cached.api.getState().status, 'cached');
  assert.deepEqual({...cached.api.getState().counts}, {one: 4, two: 9});
});
test('concurrent opens share authentication and one atomic increment; repeated opens are deduplicated', async () => {
  const app = setup((url, options) => {
    if (url.includes('accounts:signUp')) return signup();
    if (url.endsWith(':commit')) return commit(5);
    return response({documents: [document('one', 4)]});
  });
  await app.api.start();
  await Promise.all([app.api.recordOpen('one'), app.api.recordOpen('one')]);
  assert.equal(await app.api.recordOpen('one'), false);
  assert.equal(app.calls.filter(call => call.url.includes('accounts:signUp')).length, 1);
  const writes = app.calls.filter(call => call.url.endsWith(':commit'));
  assert.equal(writes.length, 1);
  const batch = JSON.parse(writes[0].options.body);
  assert.equal(batch.writes.length, 2);
  assert.deepEqual(batch.writes[0].updateTransforms[0], {fieldPath: 'count', increment: {integerValue: '1'}});
  assert.equal(batch.writes[0].updateTransforms[1].setToServerValue, 'REQUEST_TIME');
  assert.equal(batch.writes[1].currentDocument.exists, false);
  assert.equal(batch.writes[1].updateTransforms[0].fieldPath, 'openedAt');
  assert.equal(batch.writes[1].update.fields.uid.stringValue, 'anonymousUser1');
  assert.match(batch.writes[1].update.name, /receipts\/1791676800000\/opens\/one_anonymousUser1$/);
  assert.equal(app.api.getState().counts.one, 5);
});
test('the daily allowance resets at midnight in Japan, with session refresh instead of a new user', async () => {
  let total = 0;
  const app = setup(url => {
    if (url.includes('accounts:signUp')) return signup();
    if (url.includes('securetoken.googleapis.com')) return response({user_id: 'anonymousUser1', id_token: 'renewed-id-token', refresh_token: 'browser-refresh-token', expires_in: '3600'});
    if (url.endsWith(':commit')) return commit(++total);
    return response({});
  });
  await app.api.start();
  await app.api.recordOpen('one');
  app.advance(2 * 60000);
  assert.equal(await app.api.recordOpen('one'), true);
  const days = app.calls.filter(call => call.url.endsWith(':commit')).map(call => JSON.parse(call.options.body).writes[1].update.name.split('/receipts/')[1].split('/')[0]);
  assert.equal(Number(days[1]) - Number(days[0]), dayMs);
  app.advance(dayMs);
  assert.equal(await app.api.recordOpen('two'), true);
  assert.equal(app.calls.filter(call => call.url.includes('accounts:signUp')).length, 1);
  assert.equal(app.calls.filter(call => call.url.includes('securetoken.googleapis.com')).length, 1);
});
test('a receipt recorded in another tab prevents an increment after local deduplication is lost', async () => {
  const app = setup(url => {
    if (url.includes('accounts:signUp')) return signup();
    if (url.endsWith(':commit')) return response({error: {message: 'ALREADY_EXISTS'}}, 409);
    if (url.includes('/opens/')) return response({fields: {uid: {stringValue: 'anonymousUser1'}, slug: {stringValue: 'one'}, openedAt: {timestampValue: '2026-10-11T00:00:00Z'}}});
    return response({documents: [document('one', 12)]});
  });
  await app.api.start();
  assert.equal(await app.api.recordOpen('one'), false);
  assert.equal(await app.api.recordOpen('one'), false);
  assert.equal(app.calls.filter(call => call.url.endsWith(':commit')).length, 1);
  assert.equal(app.api.getState().counts.one, 12);
  assert.equal(app.calls.filter(call => call.url.includes('/opens/')).length, 1);
});
test('an older in-flight snapshot cannot erase a successfully recorded count', async () => {
  let release;
  let first = true;
  const app = setup(url => {
    if (url.includes('accounts:signUp')) return signup();
    if (url.endsWith(':commit')) return commit(6);
    if (first) { first = false; return response({documents: [document('one', 4)]}); }
    return new Promise(resolve => { release = () => resolve(response({documents: [document('one', 4)]})); });
  });
  await app.api.start();
  const loading = app.api.start();
  assert.equal(await app.api.recordOpen('one'), true);
  release();
  await loading;
  assert.equal(app.api.getState().counts.one, 6);
});
test('unknown projects, missing configuration, storage failures and network failures are harmless', async () => {
  const disabled = setup(() => { throw new Error('unexpected fetch'); }, {}, false);
  assert.equal(await disabled.api.recordOpen('one'), false);
  assert.equal(await disabled.api.start(), false);
  assert.equal(disabled.calls.length, 0);
  const app = setup(() => { throw new Error('network'); });
  assert.equal(await app.api.recordOpen('unknown'), false);
  assert.equal(app.calls.length, 0);
  assert.equal(await app.api.recordOpen('one'), false);
  assert.equal(app.api.getState().counts, null);
  app.window.localStorage.getItem = app.window.localStorage.setItem = () => { throw new Error('private browsing'); };
  assert.equal(await app.api.start(), false);
});
