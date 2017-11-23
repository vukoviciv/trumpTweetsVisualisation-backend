module.exports = (sequelize, DataTypes) =>
  sequelize.define('User', {
    name: DataTypes.STRING,
    screen_name: DataTypes.STRING,
    description: DataTypes.STRING,
    followers_count: DataTypes.BIGINT,
    statuses_count: DataTypes.BIGINT,
    profile_background_image_url: DataTypes.STRING,
    profile_background_image_url_https: DataTypes.STRING,
    profile_image_url: DataTypes.STRING,
    profile_image_url_https: DataTypes.STRING,
    profile_banner_url: DataTypes.STRING,
  });
