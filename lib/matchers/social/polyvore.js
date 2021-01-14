module.exports = function (href, referrer, callback) {
    if (referrer.host && referrer.host.indexOf('polyvore.com') !== -1) {
        return callback(null, {
            type: 'social',
            network: 'polyvore'
        });
    }
    else {
        return callback(null, false);
    }
};
//# sourceMappingURL=polyvore.js.map