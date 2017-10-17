const numberOfTweetsPerRequest = 200; // see https://dev.twitter.com/rest/reference/get/statuses/user_timeline
const maxNumberOfTweets = 10000;

// ID of the tweet sent on Dec 29 2016 (Inauguration day)
// My Administration will follow two simple rules: https://t.co/ZWk0j4H8Qy, id = 814484710025994241
const sinceId = '814231064847728640';

// Relative URL for tweets API
const tweetsUrl = 'statuses/user_timeline';

// Parameters for API request on statuses/user_timeline
var queryParams = {
    screen_name: 'realDonaldTrump',
    count: numberOfTweetsPerRequest,
    exclude_replies: true,
    since_id: sinceId,
    tweet_mode: 'extended',
    include_rts: false
};

// Tweet properties which we need
const tweetProps = [
    'id_str',
    'full_text',
    'source',
    'created_at',
    'retweet_count',
    'favorite_count'
];

const userProps = [
    'name',
    'screen_name',
    'description',
    'followers_count',
    'statuses_count',
    'profile_background_image_url',
    'profile_background_image_url_https',
    'profile_image_url',
    'profile_image_url_https'
];

// Predefined words for analyse tweet text
const words = ['BAD', 'SAD', 'PRESIDENT', 'WAR', 'BECAUSE', 'FAKE', 'I', 'SECURITY', 'PUBLIC', 'MY', 'TRUE', 'HUGE', 'TREMENDOUS', 'TOLERATED', 'WE',
'REPLACE', 'OBAMA', 'IVANKA', 'WALL', 'CHINA', 'GREAT', 'BEST'];

module.exports = {
    queryParams,
    maxNumberOfTweets,
    tweetsUrl,
    tweetProps,
    userProps,
    words
};
