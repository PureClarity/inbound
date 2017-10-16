

module.exports = function (href, referrer, callback) {

  if (referrer.host && (referrer.host.indexOf('mail.live.com') || referrer.host.indexOf('hotmail') || referrer.host.indexOf('outlook')) !== -1) {
    return callback(null, {
      type: 'email',
      client: 'outlook',
      from: referrer.href,
      link: href.href
    });
  } else {
    return callback(null, false);
  }

};