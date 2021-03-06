"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var querystring = require('querystring');
module.exports = function (href, referrer, callback) {
    if (referrer.host &&
        referrer.path &&
        (referrer.host.indexOf('google') !== -1 ||
            referrer.host.indexOf('googleadservices.com') !== -1 ||
            referrer.path.indexOf("gclid") !== -1)) {
        const description = {
            type: 'ad',
            network: 'google'
        };
        var query = querystring.parse(referrer.query).q;
        if (query)
            description.query = query;
        return callback(null, description);
    }
    else {
        return callback(null, false);
    }
};
//# sourceMappingURL=google.js.map