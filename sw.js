const C='apphouse-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('message',async e=>{ if(e.data&&e.data.cache){const c=await caches.open(C);await c.addAll(e.data.cache);e.source.postMessage({cached:true});}
 if(e.data&&e.data.clear){await caches.delete(C);e.source.postMessage({cleared:true});}});
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET')return;
 e.respondWith(caches.open(C).then(c=>c.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{ const cl=res.clone(); if(res.ok&&new URL(e.request.url).origin===location.origin) c.keys().then(k=>{ if(k.length) c.put(e.request,cl)}); return res;}).catch(()=>r))));});
