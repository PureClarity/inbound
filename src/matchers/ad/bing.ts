
import querystring = require('querystring');
import Description from '../../description';

module.exports = function (href, referrer, callback) {

  if (referrer.host && referrer.host.indexOf('bing.com') !== -1 &&
    href.href.indexOf("utm_medium=cpc") !== -1) {
    const description: Description = { type: 'ad', network: 'bing' };
    var query = querystring.parse(referrer.query).q;
    if (query) description.query = query;
    return callback(null, description);
  } else {
    return callback(null, false);
  }

};