// meteor.client.js
if (!window.Meteor) window.Meteor = {};

Meteor.startClient = function() {
    console.log("Meteor client initialized");

    // Generic proxy fetch through worker or direct fetch
    Meteor.proxyFetch = async function(path, options = {}) {
        const url = Meteor.Config.proxyUrl + path;

        if (Meteor.Config.useWorker && Meteor.worker) {
            return new Promise((resolve) => {
                const msg = { url, options };
                Meteor.worker.onmessage = (e) => resolve(e.data);
                Meteor.worker.postMessage(Meteor.Codecs.encode(msg));
            });
        } else {
            try {
                const res = await fetch(url, options);
                return await res.json();
            } catch (err) {
                console.error("Proxy fetch failed:", err);
                return null;
            }
        }
    };
};
