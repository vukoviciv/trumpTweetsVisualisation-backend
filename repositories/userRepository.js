const models = require('../models');
const User = models.User;

const pick = require('lodash/pick');

function createUserProfile(profileData) {
    return User.findOrCreate({
            where: {screen_name: profileData.screen_name},
            defaults: profileData
        })
        .spread((profileData, created) => {
            console.log("created: ", created);
        })
}

function findAndUpdate(profileData) {
    return User.update(profileData,
            { where: {screen_name: profileData.screen_name}
        })
        .then(result => console.log(result))
        .catch(err => console.log(err))
}

function getProfileAndBackgroundUrl() {
    return User.findOne({
        order: [['id', 'DESC']]
    }).then(userProfile => userProfile)
}

module.exports = {
    createUserProfile,
    findAndUpdate,
    getProfileAndBackgroundUrl
};
