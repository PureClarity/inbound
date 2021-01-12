

import url = require('url');
import querystring = require('querystring');
import _ = require('underscore');
import matchers from './matchers/index';
import * as utils from 'util';

/**
 * Parses a location href and document referrer
 * into semantic information about how that visitor
 * got to the page.
 * @param  {string}   href     Location href, equivalent to window.location.href
 * @param  {string}   referrer Referrer url, equivalent to document.referrer
 * @param  {Function} callback callback(err, in);
  * where "in" is a object containing referrer and campaign information
  * about this inbound visitor.
 */
exports.parse = async function parse(href, referrer) {
  var parsedHref = url.parse(href || '');
  var parsedReferrer = url.parse(referrer || '');
  const tasks: Promise<any>[] = [];
  tasks.push(parseReferrer(parsedHref, parsedReferrer));
  tasks.push(parseCampaign(parsedHref));
  let results = await Promise.all(tasks);

  var ref = results[0];
  var campaign = results[1];

  var description: { referrer?: any, campaign?: any } = {};
  if (ref) description.referrer = ref;
  if (campaign) description.campaign = campaign;

  return description;
};

async function parseReferrer(href, referrer) {
  var numOfMatchers = _.size(matchers);

  var processMatcher = function (matcherIndex, done) {
    if (matcherIndex >= numOfMatchers) return done(null, null);
    else {
      var matcher = matchers[matcherIndex];
      process.nextTick(function () {
        matcher(href, referrer, function (err, description) {
          if (err) return done(err);
          else if (description) return done(null, description);
          else return processMatcher(matcherIndex + 1, done);
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
};

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
    if (queryKey in query) campaign[ourKey] = query[queryKey];
  });
  return _.size(campaign) > 0 ? campaign : null;
};