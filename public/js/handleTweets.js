const options = require('../../lib/options');

function fetchTweets(twit, tweets, queryParams) {
    return new Promise((resolve, reject) => {
        if (tweets.length > options.maxNumberOfTweets) {
            resolve(tweets);
        } else {
            twit.get(options.tweetsUrl, queryParams,
                function (err, data, response) {
                    if (data.length === 0) {
                        resolve(tweets);
                    } else {
                        tweets = tweets.concat(...data.map(tweet => ({
                            text: tweet.text,
                            id: tweet.id,
                            profile_image_url: tweet.user.profile_image_url,
                            created_at: tweet.created_at
                        })));

                        // get ID from the last tweet so we can attach create new request from that point
                        queryParams.max_id = tweets[tweets.length - 1].id;
                        resolve(fetchTweets(twit, tweets, queryParams));
                    }
                });
        }
    });
}

module.exports = fetchTweets;
