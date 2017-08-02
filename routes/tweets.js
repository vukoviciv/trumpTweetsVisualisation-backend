const express = require('express');
const router = express.Router();
const Twit = require('twit');

let queryParams = {
    screen_name: 'realDonaldTrump',
    count: 5,
    exclude_replies: true
};

router.get('/', (req, res) => {
    let twit = getTwit();
    let tweets = [];
    get200Tweets(twit, tweets, queryParams).then((data) => res.render('tweets', {tweets: data}));
});

function getTwit() {
    return new Twit({
        consumer_key: 'uPUYHfgDdMuPR7jzZv8hm26pc',
        consumer_secret: 'B8WSnSmjbJXlPfSTnPZnxJ6WxiJhjpvA1NBMBQqoVwuxg1ZLps',
        access_token: '892325969851273216-ILfVbVkqVRTCt1T67HQpMXtvg6nhEVL',
        access_token_secret: 'yui3Knhs4JpCsae1lIyAlu4txSnIYvcEXclTKuX4tyln7'
    });
}

function get200Tweets(twit, tweets, queryParams) {
    return new Promise((resolve, reject) => {
        console.log("entering function.");
        if (tweets.length > 20) {
            console.log("rolling back");
            console.log("tweets: ", tweets);
            resolve(tweets);
        } else {
            console.log("gong for more");
            twit.get('statuses/user_timeline', queryParams,
                function (err, data, response) {
                    console.log("fetching the data");
                    tweets = tweets.concat(...data.map(tweet => ({text: tweet.text, id: tweet.id})));
                    queryParams.max_id = tweets[tweets.length - 1].id;
                    resolve(get200Tweets(twit, tweets, queryParams));
                });
        }
    });
}

module.exports = router;