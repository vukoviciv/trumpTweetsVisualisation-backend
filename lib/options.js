const maxNumberOfTweets = 20;
const numberOfTweetsPerRequest = 10; // see https://dev.twitter.com/rest/reference/get/statuses/user_timeline

// ID of the tweet sent on Dec 29 2016 (Inauguration day)
const sinceId = 814484710025994200;

// Relative URL for tweets API
const tweetsUrl = 'statuses/user_timeline';

// Parameters for API request on statuses/user_timeline
var queryParams = {
    screen_name: 'realDonaldTrump',
    count: numberOfTweetsPerRequest,
    exclude_replies: true,
    since_id: sinceId
};

// Tweet properties which we need
const tweetProps = [
    'text',
    'id',
    'id_str',
    'user.profile_image_url',
    'created_at'
];

module.exports = {
    queryParams,
    maxNumberOfTweets,
    tweetsUrl,
    tweetProps
};
