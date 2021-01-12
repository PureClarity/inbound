module.exports = function (href, referrer, callback) {
    if (referrer.host && referrer.host.indexOf('snapchat.com') !== -1) {
        return callback(null, {
            type: 'social',
            network: 'snapchat'
        });
    }
    else {
        return callback(null, false);
    }
};
//# sourceMappingURL=snapchat.js.map