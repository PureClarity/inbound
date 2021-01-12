module.exports = function (href, referrer, callback) {
    if (referrer.host && referrer.href && (!referrer.protocol || referrer.protocol != 'about:')) {
        return callback(null, {
            type: 'link',
            from: referrer.href,
            link: href.href
        });
    }
    else {
        return callback(null, false);
    }
};
//# sourceMappingURL=link.js.map