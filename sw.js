const CACHE = 'zumba-trainer-v1';
const FILES = [
  '/zumba-trainer/',
  '/zumba-trainer/index.html',
  '/zumba-trainer/manifest.json',
  '/zumba-trainer/icon-192.png',
  '/zumba-trainer/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.map(k => caches.delete(k)))
  ));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
