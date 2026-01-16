const CACHE_NAME = 'dj-master-pro-v1';
const assets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon192.png',
  '/icon512.png'
];

// Saat aplikasi pertama kali diinstal, simpan file penting ke cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Service Worker: Caching Assets');
      return cache.addAll(assets);
    })
  );
});

// Saat aplikasi dibuka, cek dulu apakah file ada di cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Jika ada di cache, pakai itu. Jika tidak, ambil dari internet.
      return response || fetch(event.request);
    })
  );
});