import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
async function list(directory,prefix=''){
  const files=[];
  for(const entry of await fs.readdir(directory,{withFileTypes:true})){
    const relative=prefix+entry.name;
    if(entry.isSymbolicLink()) throw new Error('Symlink is not a static asset: '+relative);
    if(entry.isDirectory()) files.push(...await list(path.join(directory,entry.name),relative+'/'));
    else if(entry.isFile()&&relative!=='sw.js') files.push(relative);
  }
  return files.sort();
}
const files=await list(dist);
const hash=createHash('sha256');
for(const file of files) hash.update(file+'\0').update(await fs.readFile(path.join(dist,file)));
const template=await fs.readFile(path.join(root,'src/sw.template.js'),'utf8');
hash.update(template);
const revision=hash.digest('hex').slice(0,16);
const assets=['./',...files.map(file=>'./'+file)];
await fs.writeFile(path.join(dist,'sw.js'),template.replace('__CACHE_VERSION__',revision).replace('__PRECACHE_ASSETS__',JSON.stringify(assets,null,2)));
console.log(`PWA: ${assets.length} offline assets, revision ${revision}`);
