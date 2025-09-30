importScripts("/E/eclipse.codecs.js");
importScripts("/E/eclipse.config.js");
importScripts("/E/eclipse.rewrite.js");
importScripts("/E/eclipse.worker.js");

const eclipse = new EclipseServiceWorker();

async function handleRequest(e) {
	if (eclipse.route(e)) {
		return await eclipse.fetch(e);
	}

	return await fetch(e.request);
}

self.addEventListener("fetch", (e) => {
	e.respondWith(handleRequest(e));
});
