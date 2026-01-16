const CACHE_NAME = 'dj-master-pro-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon192.png',
  './icon512.png',
  './screen1.jpg'
];

// 1. Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Menyimpan file ke cache...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activate Service Worker (Bersihkan cache lama jika update)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('Menghapus cache lama:', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// 3. Fetch (Jalankan aplikasi offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Kembalikan dari cache jika ada, jika tidak, ambil dari internet
      return response || fetch(event.request);
    })
  );
});