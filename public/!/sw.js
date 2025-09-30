// sw.js
self.addEventListener('install', (event) => {
    console.log("Service worker installed");
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Intercept proxy requests
    if (url.pathname.startsWith('/proxy')) {
        event.respondWith(
            fetch(event.request)
                .then(res => res)
                .catch(err => new Response(JSON.stringify({ error: err.message }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }))
        );
    }
});
