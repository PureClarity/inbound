var url = require('url'), _ = require('underscore');
var removableDomains = [
    'm.',
    'www.'
];
var domainTransformationMap = {
    "amazon": "amazon.com",
    "bing": "bing.com",
    "google": "google.com"
};
var domainTransformations = _.keys(domainTransformationMap);
var shortenDomain = exports.domain = function (domain) {
    if (!domain)
        return '';
    _.each(removableDomains, function (removable) {
        if (domain.indexOf(removable) === 0)
            domain = domain.replace(removable, '');
    });
    var tokens = domain.split('.');
    for (var i = 0; i < tokens.length; i += 1) {
        var token = tokens[i];
        if (_.contains(domainTransformations, token)) {
            domain = domainTransformationMap[token];
            for (var j = i - 1; j >= 0; j -= 1) {
                domain = tokens[j] + '.' + domain;
            }
            break;
        }
    }
    return domain;
};
var shortenUrl = exports.url = function (u) {
    if (!u)
        return '';
    var parsed = url.parse(u);
    if (!parsed.host)
        return '';
    return shortenDomain(parsed.host) + trim(parsed.pathname) +
        getShortHash(parsed.pathname, parsed.hash);
};
var getShortHash = function (pathname, hash) {
    var result = '';
    if (!hash)
        return result;
    if ((_.isEmpty(pathname) || pathname.length < 2) &&
        (hash.length > 0 && hash.length < 20)) {
        result = '/' + trim(hash);
    }
    return result;
};
var endsWith = function (str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};
var trim = function (str) {
    while (endsWith(str, '/') || endsWith(str, '?')) {
        str = str.substring(0, str.length - 1);
    }
    return str;
};
//# sourceMappingURL=shorten.js.map