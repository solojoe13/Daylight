// sw.js
self.addEventListener('install', (event) => {
    console.log("Service worker installed");
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (url.pathname.startsWith('/proxy')) {
        event.respondWith(fetch(event.request));
    }
});
