const SHELL_CACHE = 'infiyatra-shell-v2';
const ASSET_CACHE = 'infiyatra-assets-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith('infiyatra-') && ![SHELL_CACHE, ASSET_CACHE].includes(key))
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const responseCopy = response.clone();
            void caches.open(SHELL_CACHE).then(cache => cache.put('/index.html', responseCopy));
          }
          return response;
        })
        .catch(async () => (await caches.match('/index.html')) || caches.match('/'))
    );
    return;
  }

  const isOptimizedAsset = url.pathname.startsWith('/assets/optimized/') || url.pathname.startsWith('/fonts/');
  const isHashedBundle = /^\/assets\/[^/]+-[A-Za-z0-9_-]{8,}\.(js|css)$/.test(url.pathname);
  if (!isOptimizedAsset && !isHashedBundle) return;

  event.respondWith(
    caches.open(ASSET_CACHE).then(async cache => {
      const cached = await cache.match(request);
      if (cached) return cached;

      const response = await fetch(request);
      if (response.ok) void cache.put(request, response.clone());
      return response;
    })
  );
});
