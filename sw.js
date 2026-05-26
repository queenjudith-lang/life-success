const V='liferp-v4';const A=['./','/index.html','/manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A).catch(()=>{})));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(c=>{if(c)return c;return fetch(e.request).then(r=>{if(r&&r.status===200){const cl=r.clone();caches.open(V).then(ca=>ca.put(e.request,cl))}return r}).catch(()=>c)}))});
self.addEventListener('message',e=>{if(e.data?.type==='CLEAR')caches.keys().then(ks=>ks.forEach(k=>caches.delete(k)))});