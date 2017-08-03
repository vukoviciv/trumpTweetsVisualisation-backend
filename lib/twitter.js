const Twit = require('twit');
const {twitterConfig} = require('../config');

const twit = new Twit(twitterConfig);

module.exports = {twit};
