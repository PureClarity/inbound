module.exports = function (href, referrer, callback) {
    if (!referrer.href || (referrer.protocol && referrer.protocol == 'about:'))
        return callback(null, { type: 'direct' });
    else
        return callback(null, false);
};
//# sourceMappingURL=direct.js.map