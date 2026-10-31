import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const catalogContext={window:{}};
vm.runInNewContext(await fs.readFile(path.join(dist,'projects.js'),'utf8'),catalogContext);
const projects=catalogContext.window.CADMIUM_PROJECTS;

test('all requested works have correct URLs and local cover images',async()=>{
  const required=['sumaraku','-mic','rakugaction','punching','tomoshibi','aurapuzzle_-adventure','monster_collection','sumamama','endless_monsters','infographic','giftntool','C_tools','souiuimi','kanji-tower','leaf-stream-race','guchitter','mato','BOUNCEPARADE','garbage-truck','senju-otedama','climbing-the-mast','ishikoro','command','baby-race','antlion','hokorichan','pancake','nira','horse10-000','akashiro'];
  assert.equal(new Set(projects.map(p=>p.slug)).size,projects.length);
  assert.equal(new Set(projects.map(p=>p.order)).size,projects.length);
  for(const slug of required){
    const p=projects.find(p=>p.slug===slug);
    assert.ok(p,'Missing work '+slug);
    const repository=slug==='leaf-stream-race'?'Leaf-stream':slug;
    assert.equal(p.url,slug==='leaf-stream-race'?'https://cadmium2525.github.io/Leaf-stream/race':`https://cadmium2525.github.io/${slug}/${slug==='sumamama'?'docs/':''}`);
    assert.equal(p.github,`https://github.com/cadmium2525/${repository}`);
    assert.ok(p.title&&p.reading&&p.description&&p.tags.length);
    assert.ok(p.image.startsWith('assets/')&&!p.image.includes('..'));
    assert.ok((await fs.stat(path.join(dist,p.image))).size>0);
  }
  for(const slug of ['infographic','giftntool','C_tools','guchitter']) assert.equal(projects.find(p=>p.slug===slug).kind,'tool');
  const rules=await fs.readFile(path.join(root,'firebase/gallery-popularity.rules.inc'),'utf8');
  for(const slug of required){
    assert.ok(rules.includes("'"+slug+"'"),'Popularity counter missing '+slug);
    assert.ok(rules.includes("'"+slug+"_' + uid"),'Popularity receipt missing '+slug);
  }
});
test('PWA resolves inside /list/ and has correctly sized PNG icons',async()=>{
  const m=JSON.parse(await fs.readFile(path.join(dist,'manifest.webmanifest'),'utf8'));
  const base='https://cadmium2525.github.io/list/';
  assert.equal(new URL(m.scope,base).pathname,'/list/');
  assert.equal(new URL(m.start_url,base).pathname,'/list/');
  assert.equal(m.display,'standalone');
  for(const icon of m.icons){
    const image=await fs.readFile(path.join(dist,icon.src));
    assert.equal(image.subarray(1,4).toString(),'PNG');
    assert.equal(`${image.readUInt32BE(16)}x${image.readUInt32BE(20)}`,icon.sizes);
  }
  assert.ok(m.icons.some(i=>i.purpose==='maskable'));
});
async function worker(){
  const handlers=new Map(), stores=new Map(), deleted=[];
  let claimed=false, online=true, networkCalls=0;
  const scope='https://cadmium2525.github.io/list/';
  const key=input=>typeof input==='string'?input:input.url;
  function makeCache(){const data=new Map();return {data,async addAll(requests){for(const request of requests){const url=new URL(request.url);const file=url.pathname.slice('/list/'.length)||'index.html';data.set(key(request),new Response(await fs.readFile(path.join(dist,file))));}},async match(input){return data.get(key(input))?.clone();},async put(input,response){data.set(key(input),response);}};}
  const caches={async open(name){if(!stores.has(name))stores.set(name,makeCache());return stores.get(name);},async keys(){return [...stores.keys()];},async delete(name){deleted.push(name);return stores.delete(name);}};
  const self={registration:{scope},clients:{async claim(){claimed=true;}},addEventListener(name,handler){handlers.set(name,handler);}};
  const context={self,caches,URL,Request,Response,fetch:async()=>{networkCalls++;if(!online)throw new Error('offline');return new Response('fresh gallery');}};
  vm.runInNewContext(await fs.readFile(path.join(dist,'sw.js'),'utf8'),context);
  async function lifecycle(name){let done;handlers.get(name)({waitUntil(p){done=p;}});await done;}
  function request(url,mode='cors',method='GET'){let response;handlers.get('fetch')({request:{url,mode,method},respondWith(p){response=p;}});return response;}
  return {scope,stores,deleted,lifecycle,request,offline(){online=false;},claimed:()=>claimed,networkCalls:()=>networkCalls};
}
test('offline navigation keeps filters and all gallery assets available',async()=>{
  const w=await worker();
  await w.lifecycle('install');
  w.offline();
  const response=await w.request(w.scope+'?kind=tool&tag=育成支援','navigate');
  assert.equal(response.status,200);
  assert.match(await response.text(),/CADMIUM/);
  for(const p of projects){const image=await w.request(new URL(p.image,w.scope).href);assert.ok((await image.arrayBuffer()).byteLength>0);}
  assert.equal(w.networkCalls(),1,'Only the navigation tries the offline network');
});
test('service worker never intercepts other games or external sites',async()=>{
  const w=await worker();
  assert.equal(w.request('https://cadmium2525.github.io/sumaraku/','navigate'),undefined);
  assert.equal(w.request('https://github.com/cadmium2525/list','navigate'),undefined);
  assert.equal(w.request(w.scope+'projects.js','cors','POST'),undefined);
  assert.equal(w.request(w.scope+'unknown-file.js'),undefined);
});
test('an update removes only this gallery scope caches',async()=>{
  const w=await worker();await w.lifecycle('install');
  const name=[...w.stores.keys()][0], prefix=name.slice(0,-16);
  const old=prefix+'previous';
  w.stores.set(old,{});w.stores.set('monster-game-save-cache',{});w.stores.set('cadmium-gallery-%2Fother%2F-old',{});
  await w.lifecycle('activate');
  assert.deepEqual(w.deleted,[old]);assert.equal(w.claimed(),true);
  assert.ok(w.stores.has('monster-game-save-cache'));assert.ok(w.stores.has('cadmium-gallery-%2Fother%2F-old'));
});
