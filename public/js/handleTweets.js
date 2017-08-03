function fetchTweets(twit, tweets, queryParams) {
    console.log("query params", queryParams);

    return new Promise((resolve, reject) => {
        if (tweets.length > 20) {
            resolve(tweets);
        } else {
            twit.get('statuses/user_timeline', queryParams,
                function (err, data, response) {
                    tweets = tweets.concat(...data.map(tweet => ({
                        text: tweet.text,
                        id: tweet.id,
                        profile_image_url: tweet.user.profile_image_url,
                        created_at: tweet.created_at
                    })));
                    queryParams.max_id = tweets[tweets.length - 1].id;
                    resolve(fetchTweets(twit, tweets, queryParams));
                });
        }
    });
}


module.exports = fetchTweets;