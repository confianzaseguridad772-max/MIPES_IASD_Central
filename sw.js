self.addEventListener('install', (e) => {
    // Fuerza al SW a activarse sin esperar
    self.skipWaiting();
    console.log('Service Worker: Instalado');
});

self.addEventListener('fetch', (e) => {
    e.respondWith(fetch(e.request));
});
