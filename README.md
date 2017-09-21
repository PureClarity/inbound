# PureClarity inbound
---------------

### Based on the original [Segment.io inbound lib](https://github.com/segmentio/inbound)

inbound is a referrer parsing library for node.js / express web apps.

Includes referrers for social media sites, search, email providers and ads

## Supported Matchers

### Social
* [Facebook](https://github.com/PureClarity/inbound/tree/master/lib/matchers/social/facebook.js)
* [Twitter](https://github.com/PureClarity/inbound/tree/master/lib/matchers/social/twitter.js)
* [Google+](https://github.com/PureClarity/inbound/tree/master/lib/matchers/social/googlePlus.js)
* [Pinterest](https://github.com/PureClarity/inbound/tree/master/lib/matchers/social/pinterest.js)
* [LinkedIn](https://github.com/PureClarity/inbound/tree/master/lib/matchers/social/linkedin.js)
* [Me2day](https://github.com/PureClarity/inbound/tree/master/lib/matchers/social/me2day.js)
* [Instagram](https://github.com/PureClarity/inbound/tree/master/lib/matchers/social/instagram.js)
* [Polyvore](https://github.com/PureClarity/inbound/tree/master/lib/matchers/social/polyvore.js)
* [Reddit](https://github.com/PureClarity/inbound/tree/master/lib/matchers/social/reddit.js)
* [Snapchat](https://github.com/PureClarity/inbound/tree/master/lib/matchers/social/snapchat.js)
* [Tumblr](https://github.com/PureClarity/inbound/tree/master/lib/matchers/social/tumblr.js)
* [Youtube](https://github.com/PureClarity/inbound/tree/master/lib/matchers/social/youtube.js)

### Search
* [Google](https://github.com/PureClarity/inbound/tree/master/lib/matchers/search/google.js)
* [Bing](https://github.com/PureClarity/inbound/tree/master/lib/matchers/search/bing.js)
* [Yahoo](https://github.com/PureClarity/inbound/tree/master/lib/matchers/search/yahoo.js)
* [Baidu](https://github.com/PureClarity/inbound/tree/master/lib/matchers/search/baidu.js)
* [Yandex](https://github.com/PureClarity/inbound/tree/master/lib/matchers/search/yandex.js)
* [Naver](https://github.com/PureClarity/inbound/tree/master/lib/matchers/search/naver.js)
* [Daum](https://github.com/PureClarity/inbound/tree/master/lib/matchers/search/daum.js)
* [Nate](https://github.com/PureClarity/inbound/tree/master/lib/matchers/search/nate.js)

### Email Clients
* [Gmail](https://github.com/PureClarity/inbound/tree/master/lib/matchers/email/gmail.js)
* [Yahoo](https://github.com/PureClarity/inbound/tree/master/lib/matchers/email/yahoo.js)
* [Hotmail](https://github.com/PureClarity/inbound/tree/master/lib/matchers/email/hotmail.js)
* [Naver](https://github.com/PureClarity/inbound/tree/master/lib/matchers/email/naver.js)
* [Daum](https://github.com/PureClarity/inbound/tree/master/lib/matchers/email/daum.js)

### Ads
* [Bing](https://github.com/PureClarity/inbound/tree/master/lib/matchers/ad/bing.js)
* [Google](https://github.com/PureClarity/inbound/tree/master/lib/matchers/ad/google.js)
* [Yahoo](https://github.com/PureClarity/inbound/tree/master/lib/matchers/ad/yahoo.js)

### Internal
Internal referrers occur when a visitor navigates between two pages of the same domain. Example: http://site.com => http://site.com/about

* [Internal](https://github.com/PureClarity/inbound/tree/master/lib/matchers/internal/internal.js)

### Link
If there is a referrer present but it's unrecognized above, we'll just call it a link referrer.

* [Link](https://github.com/PureClarity/inbound/tree/master/lib/matchers/link/link.js)

### Direct
When a visitor navigates to a site by typing in the url into the address bar, ```document.referrer``` is blank. This is called a direct referral. (There are some [other reasons](#why-is-my-documentreferrer-blank) this can happen as well.)

* [Direct](https://github.com/PureClarity/inbound/tree/master/lib/matchers/direct/direct.js)

## Utilities

### Shorten API

If you want to count the number of people who came from a specific referrer, you might want to make the following map:

```referrer => { set_of_visitors }```

However, referrers and urls tend to have differences that don't really matter to you, but are slightly different.

Use the `inbound.shorten` API to make the referrers and domains unique.

```javascript
inbound.shorten.url('https://segment.io/?imm_mid=094f89&cmp=em-npa-ug-nl-sep15-html')
// "segment.io"

inbound.shorten.url('http://ianstormtaylor.com/oocss-plus-sass-is-the-best-way-to-css/?utm_source=hackernewsletter&utm_medium=email')
// "ianstormtaylor.com/oocss-plus-sass-is-the-best-way-to-css
```

## Contribute

### Contributors
+ [@ivolo](https://github.com/ivolo)
+ [@asolove](https://github.com/asolove)
+ [@xissy](https://github.com/xissy)
+ [@rybnik](https://github.com/rybnik)

### Matchers
Matchers help identify and attach more semantic information to referral sources. We'd your help on adding the hundreds of social, search, ad, and other referral sources not matched yet by inbound.

To add matchers:

1. Using existing matchers as an example, create your matcher at [/lib/matchers/](https://github.com/PureClarity/inbound/tree/master/lib/matchers/).
1. Add your matcher to the priority list of matchers in [index.js](https://github.com/PureClarity/inbound/tree/master/lib/matchers/index.js).
1. Add your test cases to [the test cases file](https://github.com/PureClarity/inbound/tree/master/test/cases/referrers.json).
1. Run and confirm that your test cases pass: ```npm test```

1. Add your matcher to the [readme](https://github.com/PureClarity/inbound/tree/master/README.md).
1. Submit your pull request!

## Advanced

### Why is my document.referrer blank?
1. The visitor came directly to your site by typing the link into the browser's bar.
2. The visitor clicked a link on an https:// page and arrived at a http:// page, such as clicking a link to http://hypem.com on a https://gmail.com email. (Chrome will strip the referrer since you're downgrading security).
3. You were 301 redirected via a proxy that didn't maintain the referrer header.

### Why is the matchers API asynchronous?

Even though most matchers do synchronous string matching, leaving the API asynchronous allows matchers that fill in more semantic information about the referrer by hitting some sort of API.

## License


```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```
