const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];
const fs = require('fs');

const twitterConfig = JSON.parse(fs.readFileSync('./twitterAccount.json'));

// DB connection
const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: config.database,
};

module.exports = {
  twitterConfig,
  connectionConfig,
};
