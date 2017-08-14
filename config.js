const fs = require('fs');
const twitterConfig = JSON.parse(fs.readFileSync('./twitterAccount.json'));

// DB connection
const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'trump_tweets'
};

module.exports = {
    twitterConfig,
    connectionConfig
};
