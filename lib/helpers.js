const {twit} = require('./twitter');

const pick = require('lodash/pick');
const unicqBy = require('lodash/uniqBy');

function fetchTweets(options = {}, maxId = null, tweets = []) {
    return fetchPage(maxId, options)
        .then(({ dataTweets, maxId }) => {
            tweets = tweets.concat(...dataTweets);
            if (tweets.length < options.maxNumberOfTweets && dataTweets.length > 0) {
                return fetchTweets(options, maxId, unicqBy(tweets, 'id'));
            }
            return tweets;
        });
}

function fetchPage(maxId, options = {}) {
    let params = Object.assign({}, options.queryParams);
    if (maxId) {
        params.max_id = maxId
    }
    return twit.get(options.tweetsUrl, params)
        .then(({data, resp}) => {
            let dataTweets = data.map(tweet => pick(tweet, options.tweetProps));

            if (dataTweets.length > 0) {
                maxId = dataTweets[dataTweets.length - 1].id;
            }

            return {dataTweets, maxId};
        })
}

module.exports = fetchTweets;
