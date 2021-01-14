"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var querystring = require('querystring');
module.exports = function (href, referrer, callback) {
    if (referrer.host && referrer.host.indexOf('bing.com') !== -1) {
        const description = { type: 'search', engine: 'bing' };
        var query = querystring.parse(referrer.query).q;
        if (query)
            description.query = query;
        return callback(null, description);
    }
    else {
        return callback(null, false);
    }
};
//# sourceMappingURL=bing.js.map