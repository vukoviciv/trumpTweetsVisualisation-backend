module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Users', 'last_tweet_id_str')
    }
};