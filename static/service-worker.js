self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('tichu-counter-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/src/app.html',
        '/src/global.css',
        '/manifest.json',
        // Add other assets that need to be cached
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
