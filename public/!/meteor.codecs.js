// meteor.codecs.js
// Encode/decode messages

Meteor.Codecs = {
    encode: function(obj) {
        return JSON.stringify(obj);
    },
    decode: function(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.error("Decoding error:", e);
            return null;
        }
    }
};
