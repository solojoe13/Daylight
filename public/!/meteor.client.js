// meteor.client.js
if (!window.Meteor) window.Meteor = {};

Meteor.startClient = function() {
    console.log("Meteor client initialized");

    Meteor.connect = async function(url) {
        try {
            const res = await fetch(url);
            return await res.json();
        } catch (err) {
            console.error("Connection failed:", err);
            return null;
        }
    };
};
