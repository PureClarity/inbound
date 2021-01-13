import Description from "../../description";

var querystring = require('querystring');

module.exports = function (href, referrer, callback) {

  if (referrer.host && referrer.host.indexOf('baidu.com') !== -1) {
    const description:Description = { type: 'search', engine: 'baidu' };
    var query = querystring.parse(referrer.query).wd;
    if (query) description.query = query;
    return callback(null, description);
  } else {
    return callback(null, false);
  }

};