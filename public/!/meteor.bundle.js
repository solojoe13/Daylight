// meteor.bundle.js
// Integrated Meteor proxy bundle

// Load configs first
import './!/meteor.config.js';
import './!/meteor.codecs.js';
import './!/meteor.client.js';
import './!/meteor.worker.js';

// Initialize Meteor namespace
if (!window.Meteor) window.Meteor = {};

// Start the client
Meteor.start = function() {
    console.log("Meteor client started");

    // Connect example function
    Meteor.connect = async function(url) {
        try {
            const res = await fetch(url);
            return await res.json();
        } catch (err) {
            console.error("Connection failed:", err);
            return null;
        }
    };

    // Initialize worker if enabled
    if (Meteor.Config.useWorker) {
        const worker = new Worker('./meteor.worker.js');
        console.log("Meteor worker started");

        // Example message
        worker.postMessage(Meteor.Codecs.encode({ init: true }));

        worker.onmessage = (e) => {
            console.log("Worker response:", e.data);
        };

        Meteor.worker = worker;
    }

    // Register service worker if available
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log("Service Worker registered:", reg))
            .catch(err => console.error("SW registration failed:", err));
    }
};

// Initialize bundle
console.log("Meteor bundle loaded");
Meteor.start();
