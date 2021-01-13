"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (href, referrer, callback) {
    if (referrer.host && referrer.host.indexOf('yellowpages.com') !== -1) {
        const description = { type: 'local', site: 'yellowpages' };
        var parts = referrer.pathname.split("/");
        if (parts[1])
            description.location = parts[1].replace('-', ' ');
        if (parts[2] && parts[2] !== "mip")
            description.query = parts[2];
        return callback(null, description);
    }
    else {
        return callback(null, false);
    }
};
//# sourceMappingURL=yellowpages.js.map