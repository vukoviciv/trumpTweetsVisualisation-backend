'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Tweet', {
        id_str: DataTypes.STRING,
        text: DataTypes.TEXT,
        source: DataTypes.STRING,
        retweet_count: DataTypes.BIGINT,
        favorite_count: DataTypes.BIGINT
    }, {
        classMethods: {
            associate: models => {
                // define associations here
            }
        }
    });
};