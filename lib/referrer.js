"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const querystring = require("querystring");
const _ = require("underscore");
const index_1 = require("./matchers/index");
const utils = require("util");
exports.parse = async function parse(href, referrer) {
    var parsedHref = url.parse(href || '');
    var parsedReferrer = url.parse(referrer || '');
    const tasks = [];
    tasks.push(parseReferrer(parsedHref, parsedReferrer));
    tasks.push(parseCampaign(parsedHref));
    let results = await Promise.all(tasks);
    var ref = results[0];
    var campaign = results[1];
    var description = {};
    if (ref)
        description.referrer = ref;
    if (campaign)
        description.campaign = campaign;
    return description;
};
async function parseReferrer(href, referrer) {
    var numOfMatchers = _.size(index_1.default);
    var processMatcher = function (matcherIndex, done) {
        if (matcherIndex >= numOfMatchers)
            return done(null, null);
        else {
            var matcher = index_1.default[matcherIndex];
            process.nextTick(function () {
                matcher(href, referrer, function (err, description) {
                    if (err)
                        return done(err);
                    else if (description)
                        return done(null, description);
                    else
                        return processMatcher(matcherIndex + 1, done);
                });
            });
        }
    };
    let procMatcherAsync = utils.promisify(processMatcher);
    if (numOfMatchers > 0) {
        return await procMatcherAsync(0);
    }
    else {
        return null;
    }
}
;
var campaignKeyMap = {
    'utm_campaign': 'campaign',
    'utm_source': 'source',
    'utm_term': 'term',
    'utm_medium': 'medium',
    'utm_count': 'content'
};
async function parseCampaign(href) {
    var query = querystring.parse(href.query);
    var campaign = {};
    _.each(campaignKeyMap, function (ourKey, queryKey) {
        if (queryKey in query)
            campaign[ourKey] = query[queryKey];
    });
    return _.size(campaign) > 0 ? campaign : null;
}
;
//# sourceMappingURL=referrer.js.map