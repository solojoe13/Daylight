// meteor.bundle.js
import './!/meteor.config.js';
import './!/meteor.codecs.js';
import './!/meteor.client.js';
import './!/meteor.worker.js';

if (!window.Meteor) window.Meteor = {};

Meteor.start = function() {
    console.log("Meteor bundle loaded");

    // Start client
    Meteor.startClient();

    // Initialize worker if enabled
    if (Meteor.Config.useWorker) {
        const worker = new Worker('./meteor.worker.js');
        console.log("Meteor worker started");

        // Keep global reference
        Meteor.worker = worker;
    }

    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log("Service Worker registered:", reg))
            .catch(err => console.error("SW registration failed:", err));
    }
};

// Auto-start
Meteor.start();
