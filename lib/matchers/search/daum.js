"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var querystring = require('querystring');
module.exports = function (href, referrer, callback) {
    if (referrer.host && referrer.host.indexOf('search.daum.net') !== -1) {
        const description = { type: 'search', engine: 'daum' };
        var query = querystring.parse(referrer.query).q;
        if (query)
            description.query = query;
        return callback(null, description);
    }
    else {
        return callback(null, false);
    }
};
//# sourceMappingURL=daum.js.map