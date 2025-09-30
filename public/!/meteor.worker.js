// meteor.worker.js
self.onmessage = async function(e) {
    const data = Meteor.Codecs.decode(e.data);

    if (!data) return;

    try {
        const res = await fetch(data.url, data.options);
        const json = await res.json();
        self.postMessage(Meteor.Codecs.encode(json));
    } catch (err) {
        console.error("Worker fetch error:", err);
        self.postMessage(Meteor.Codecs.encode({ error: err.message }));
    }
};
