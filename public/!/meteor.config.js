// meteor.config.js
Meteor.Config = {
    proxyUrl: '/proxy',   // Requests starting with this path will be intercepted
    useWorker: true,
    cacheEnabled: true
};
