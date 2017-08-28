const models = require('../models');

const testTweet = {
    id_str: '898567378988015616',
    full_text: 'I have directed that U.S. Cyber Command be elevated to the status of a Unified Combatant Command focused on....cont: https://t.co/3iScfuMw9s',
    source: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
    retweet_count: 14194,
    favorite_count: 56799,
    created_at: 'Fri Aug 18 15:28:52 +0000 2017'
};

function saveOne(tweet) {
    return models.Tweet.findOrCreate({
            where: testTweet //temp
        })
        .spread((tweet, created) => {
            console.log("created: ", created);
        })
}

function saveBulk(tweets) {
    // promise all
}

function getAll() {
    models.Tweet.findAll().then(tweets => console.log(tweets));
}

module.exports = {
    saveOne,
    getAll
};
