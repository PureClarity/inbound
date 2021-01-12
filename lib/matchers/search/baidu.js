"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var querystring = require('querystring');
module.exports = function (href, referrer, callback) {
    if (referrer.host && referrer.host.indexOf('baidu.com') !== -1) {
        const description = { type: 'search', engine: 'baidu' };
        var query = querystring.parse(referrer.query).wd;
        if (query)
            description.query = query;
        return callback(null, description);
    }
    else {
        return callback(null, false);
    }
};
//# sourceMappingURL=baidu.js.map