import Description from "../../description";

var querystring = require('querystring');

module.exports = function (href, referrer, callback) {

  if (referrer.host && referrer.href &&
      referrer.host.indexOf('www.google.co') !== -1) {

    const description:Description = { type: 'search', engine: 'google' };
    var query = querystring.parse(referrer.query).q;
    if (query) description.query = query;
    return callback(null, description);
  } else {
    return callback(null, false);
  }

};