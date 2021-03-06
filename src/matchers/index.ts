
/**
 * Priority fall through list of url matchers
 * @type {Array}
 */
export const matchers = [
  require('./ad/bing'),
  require('./ad/google'),
  require('./ad/yahoo'),

  require('./local/bing'),
  require('./local/foursquare'),
  require('./local/groupon'),
  require('./local/livingsocial'),
  require('./local/mapquest'),
  require('./local/opentable'),
  require('./local/yahoo'),
  require('./local/yellowpages'),
  require('./local/yelp'),

  require('./social/facebook'),
  require('./social/googlePlus'),
  require('./social/linkedin'),
  require('./social/pinterest'),
  require('./social/twitter'),
  require('./social/me2day'),
  require('./social/instagram'),
  require('./social/polyvore'),
  require('./social/reddit'),
  require('./social/snapchat'),
  require('./social/tumblr'),
  require('./social/youtube'),

  require('./search/aol'),
  require('./search/baidu'),
  // google search should be after google+
  require('./search/google'),
  require('./search/yahoo'),
  require('./search/bing'),
  require('./search/yandex'),
  require('./search/naver'),
  require('./search/daum'),
  require('./search/nate'),

  require('./email/gmail'),
  require('./email/hotmail'),
  require('./email/yahoo'),
  require('./email/naver'),
  require('./email/daum'),

  require('./link/link'),

  require('./direct/direct'),

  require('./unknown/unknown')

];

export default matchers;