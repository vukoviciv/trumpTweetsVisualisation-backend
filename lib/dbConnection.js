const Sequelize = require('sequelize');

const env       = process.env.NODE_ENV || 'test';
const config    = require(__dirname + '/../config/config.json')[env];

// TODO import db config
/* AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAA */
const sequelize = new Sequelize(config.database, 'root', 'root', {
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
