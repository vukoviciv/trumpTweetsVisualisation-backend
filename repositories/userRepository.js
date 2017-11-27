const models = require('../models');

const { User } = models;

const createUserProfile = profileData =>
  User.findOrCreate({
    where: { screen_name: profileData.screen_name },
    defaults: profileData,
  }).spread((data, created) => {
    console.log('created: ', created);
  });

const findAndUpdate = profileData =>
  User.update(profileData, {
    where: { screen_name: profileData.screen_name },
  })
    .then((numOfUpdatedRows, updatedRows) => {
      console.log('Updated rows: ', updatedRows);
      return numOfUpdatedRows;
    })
    .catch(err => console.log(err));

const getProfileAndBackgroundUrl = () =>
  User.findOne({ order: [['id', 'DESC']] })
    .then(userProfile => userProfile);

module.exports = {
  createUserProfile,
  findAndUpdate,
  getProfileAndBackgroundUrl,
};
