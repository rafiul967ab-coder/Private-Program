const CACHE_NAME = 'hsc-app-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './ict.html',
  './english.html',
  './economics.html',
  './admin.html',
  './style.css',
  './script.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      const fetchPromise = fetch(e.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, networkResponse.clone()));
        }
        return networkResponse;
      }).catch(() => cachedResponse);
      return cachedResponse || fetchPromise;
    })
  );
});