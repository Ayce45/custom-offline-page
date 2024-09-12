const CACHE_NAME = 'offline-demo-';
const OFFLINE_URL = 'offline_page.html';

self.addEventListener("install", event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll([
        './styles.css',
        'auto_reload.js',
        OFFLINE_URL
      ]);
    })()
  );
});

this.addEventListener('fetch', event => {
  // Navigate request is created while navigating between pages
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const networkResponse = await fetch(event.request);

        // We are online
        return networkResponse;
      } catch (error) {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return cachedResponse;
      }
    })()
    );
  }
  else {
    event.respondWith((async () => {
      // Cache first strategy, fallback to network
      const cachedAssets = await caches.match(event.request);
      return cachedAssets || fetch(event.request);
    })()
    );
  }
});