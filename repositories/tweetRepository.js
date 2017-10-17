const models = require('../models');
const Tweet = models.Tweet;

/*  Example of a tweet

 const test = {
 id_str: '901032475111116800',
 full_text: 'Few, if any, Administrations have done more in just 7 months than the Trump A. Bills passed, regulations killed, border, military, ISIS, SC!',
 source: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
 created_at: 'Fri Aug 25 10:44:17 +0000 2017',
 retweet_count: 15628,
 favorite_count: 70984
 };
 */

function saveOne(tweet) {
    return Tweet.findOrCreate({
            where: {id_str: tweet.id_str},
            defaults: tweet
        })
        .spread((tweet, created) => {
            console.log("created: ", created);
        })
}

function saveBulk(tweets) {
    return Tweet.bulkCreate(tweets)
        .then(() => {
            console.log('Number of inserted tweets: ', tweets.length);
            return tweets.length;
        })
}

function fetchPage(pageNumber, limit) {
    let offset = pageNumber ? limit * (pageNumber - 1) : 0;

    return Tweet.findAndCountAll({
            attributes: ['id', 'id_str', 'full_text', 'created_at'],
            limit: limit,
            offset: offset,
            order: [['id', 'DESC']]
        })
        .then(data => data)
}

function fetchAll() {
    return Tweet.findAll({
            attributes: ['id', 'id_str', 'full_text', 'created_at'],
            raw: true
        })
        .then(tweets => tweets);
}

function getNewestTweet() {
    return Tweet.findOne({
        order: [['id_str', 'DESC']]
    }).then(one => one)
}

module.exports = {
    saveOne,
    saveBulk,
    fetchAll,
    fetchPage,
    getNewestTweet
};
