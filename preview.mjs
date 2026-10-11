import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.join(path.dirname(fileURLToPath(import.meta.url)),'dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webmanifest':'application/manifest+json','.json':'application/json','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.svg':'image/svg+xml'};
const port=Number(process.env.CADMIUM_PREVIEW_PORT||4397);
const server=createServer(async(req,res)=>{
  try{
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(pathname==='/'||pathname==='/list'){res.writeHead(302,{Location:'/list/'}).end();return;}
    if(!pathname.startsWith('/list/')){res.writeHead(404).end();return;}
    const file=path.resolve(root,pathname.slice(6)||'index.html');
    if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
    if(!(await stat(file)).isFile()){res.writeHead(404).end();return;}
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});
    res.end(await readFile(file));
  }catch{res.writeHead(404).end('Not found');}
});
server.listen(port,'127.0.0.1',()=>{console.log(`Local: http://127.0.0.1:${port}/list/`);console.log('Preview PID: '+process.pid);});
