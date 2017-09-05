const fs = require('fs');
const twitterConfig = JSON.parse(fs.readFileSync('./twitterAccount.json'));

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

// DB connection
const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: config.database
};

module.exports = {
    twitterConfig,
    connectionConfig
};
