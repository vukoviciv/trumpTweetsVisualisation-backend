const {twit} = require('./twitter');

const pick = require('lodash/pick');
const uniqBy = require('lodash/uniqBy');

function fetchTweets(options, maxId, tweets = []) {
    return fetchPage(maxId, options)
        .then(({ dataTweets, maxId }) => {
            tweets = uniqBy(tweets.concat(dataTweets), 'id_str'); // make sure there are no duplicate tweets
            if (tweets.length < options.maxNumberOfTweets && dataTweets.length > 0 && maxId !== tweets[tweets.length-1].id_str) {
                // this condition has edge case when enters infinite loop.
                return fetchTweets(options, maxId, tweets);
            }
            return tweets;
        });
}

function fetchPage(maxId, options) {
    let params = Object.assign({}, options.queryParams);

    if (maxId) {
        params.max_id = maxId
    }

    return twit.get(options.tweetsUrl, params)
        .then(({data, resp}) => {
            let dataTweets = data.map(tweet => pick(tweet, options.tweetProps));

            if (dataTweets.length > 0) {
                maxId = dataTweets[dataTweets.length - 1].id_str;
            }

            return {dataTweets, maxId};
        })
}

module.exports = fetchTweets;
