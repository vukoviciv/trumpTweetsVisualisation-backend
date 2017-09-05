const models = require('../models');

// example of tweet
//const test = {
//    id_str: '901032475111116800',
//    full_text: 'Few, if any, Administrations have done more in just 7 months than the Trump A. Bills passed, regulations killed, border, military, ISIS, SC!',
//    source: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
//    created_at: 'Fri Aug 25 10:44:17 +0000 2017',
//    retweet_count: 15628,
//    favorite_count: 70984
//};

function saveOne(tweet) {
    return models.Tweet.findOrCreate({
            where: {id_str: tweet.id_str},
            defaults: tweet
        })
        .spread((tweet, created) => {
            console.log("created: ", created);
        })
}

function saveBulk(tweets) {
    return Promise.all(tweets.map(tweet => {
        return saveOne(tweet)
            .then((tweet, created) => {
                // TODO this is undefined. why?
                console.log("tweet", tweet);
                console.log("created", created);
                // I need id's of created ones, to highlight them later in view.
                return created
            });
    }));
}

function fetchAll() {
    return models.Tweet.findAll().then(tweets => tweets);
}

function getNewestTweet() {
    return models.Tweet.findOne({
        order: [['id_str', 'DESC']]
    }).then(one => one)
}

/* Oldest tweet will have newest biggest ID in db. It because we are fetching in preset -> past timeline */
function getOldestTweet() {
    return models.Tweet.findOne({
        order: [['id_str', 'ASC']]
    }).then(one => one)
}

module.exports = {
    saveOne,
    saveBulk,
    fetchAll,
    getNewestTweet,
    getOldestTweet
};
