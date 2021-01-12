import Description from "../../description";

var querystring = require('querystring');

module.exports = function (href, referrer, callback) {

  if (referrer.host && referrer.host.indexOf('yandex.com') !== -1) {
    const description:Description = { type: 'search', engine: 'yandex' };
    var query = querystring.parse(referrer.query).text;
    if (query) description.query = query;
    return callback(null, description);
  } else {
    return callback(null, false);
  }

};