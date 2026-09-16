import fs from 'fs';
import path from 'path';

const routes = ['/', '/contact', '/zenops', '/solutions', '/industries', '/case-studies', '/trust'];

fs.rmSync('dist', {recursive:true, force:true});
fs.cpSync('.output/public', 'dist', {recursive:true});

import('./.output/server/index.mjs').then(async (m) => {
  for (const route of routes) {
    try {
      const res = await m.default.fetch(new Request('http://localhost' + route), {}, {waitUntil:()=>{}});
      const html = await res.text();
      const filePath = route === '/' ? 'dist/index.html' : path.join('dist', route.replace(/^\//, ''), 'index.html');
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive:true});
      fs.writeFileSync(filePath, html);
      console.log('Rendered ' + filePath);
    } catch (e) {
      console.error('Failed to render ' + route, e);
    }
  }
}).catch(console.error);
