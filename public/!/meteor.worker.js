// meteor.worker.js
self.onmessage = function(e) {
    console.log("Worker received:", e.data);
    const decoded = Meteor.Codecs.decode(e.data);
    self.postMessage(decoded);
};
