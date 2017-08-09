const Sequelize = require('sequelize');

// TODO import db config
/* AAAAAAAAAAAAAAAAAAAAA TESTIS AAAAAAAAAAAAAAAAAA */
const sequelize = new Sequelize('trump_tweets', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',

    // To create a pool of connections
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;