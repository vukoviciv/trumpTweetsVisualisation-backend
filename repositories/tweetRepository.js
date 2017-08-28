const models = require('../models');

function saveOne(tweet) {
    return models.Tweet.findOrCreate({
            where: {id_str: tweet.id_str}
        })
        .spread((tweet, created) => {
            console.log("created: ", created);
        })
}

function saveBulk(tweets) {
    return Promise.all(tweets.map(tweet => saveOne(tweet)));
}

function getAll() {
    models.Tweet.findAll().then(tweets => console.log(tweets));
}

module.exports = {
    saveOne,
    saveBulk,
    getAll
};
