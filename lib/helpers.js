const userRepository = require('../repositories/userRepository');
const { twit } = require('./twitter');

const pick = require('lodash/pick');
const uniqBy = require('lodash/uniqBy');

const fetchPage = (maxId, options) => {
  const params = Object.assign({}, options.queryParams);
  let maxTweetId = maxId;

  if (maxTweetId) {
    params.max_id = maxTweetId;
  }

  return twit.get(options.tweetsUrl, params).then(({ data }) => {
    const dataTweets = data.map(tweet => pick(tweet, options.tweetProps));

    if (dataTweets.length > 0) {
      maxTweetId = dataTweets[dataTweets.length - 1].id_str;
    }

    return { dataTweets, maxTweetId };
  });
};

const fetchTweets = (options, maxId, tweets = []) =>
  fetchPage(maxId, options)
    .then(({ dataTweets, maxTweetId }) => {
      const tweetsList = uniqBy(tweets.concat(dataTweets), 'id_str'); // make sure there are no duplicate tweets

      if (tweetsList.length < options.maxNumberOfTweets && dataTweets.length > 1) {
        return fetchTweets(options, maxTweetId, tweetsList);
      }

      return tweetsList;
    })
    .catch(err => err);

const fetchLastRawTweet = (sinceId, tweetsUrl) => {
  const queryParams = {
    screen_name: 'realDonaldTrump',
    count: 1,
    exclude_replies: true,
    max_id: sinceId, // since_id was before? why???
    tweet_mode: 'extended',
    include_rts: false,
  };

  return twit.get(tweetsUrl, queryParams);
};

const getLargeProfileImageFromSmall = imageUrl => imageUrl.replace('normal', '400x400');

const updateOrCreateProfileHandler = profileData =>
  userRepository.getProfileAndBackgroundUrl()
    .then((profile) => {
      if (profile && profileData[0]) userRepository.findAndUpdate(profileData[0].user);
      else if (profileData[0]) userRepository.createUserProfile(profileData[0].user);
    });

const updateOrCreateUserProfile = (lastTweetIdStr, tweetsUrl) =>
  fetchLastRawTweet(lastTweetIdStr, tweetsUrl)
    .then(({ data }) => updateOrCreateProfileHandler(data))
    .catch(err => err);

module.exports = {
  fetchTweets,
  getLargeProfileImageFromSmall,
  updateOrCreateUserProfile,
};
