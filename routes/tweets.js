const express = require('express');
const options = require('../lib/options');
const tweetRepository = require('../repositories/tweetRepository');
const userRepository = require('../repositories/userRepository');

const router = express.Router();

const { fetchTweets, updateUserProfile, getLargeProfileImageFromSmall } = require('../lib/helpers');

router.get('/', (req, res) => {
  userRepository.getProfileAndBackgroundUrl()
    .then(data => ({
      image: getLargeProfileImageFromSmall(data.profile_image_url_https),
      banner: data.profile_banner_url,
    }))
    .then(profile => res.render('tweets', {
      baseUrl: 'tweets',
      profile,
    }))
    .catch(err => res.render('error', { error: err }));
});

router.get('/update', (req, res) => {
  tweetRepository.getNewestTweet()
    .then((lastTweet) => {
      options.queryParams.since_id = lastTweet.id_str;
      updateUserProfile(lastTweet.id_str, options.tweetsUrl);
    })
    .then(() => fetchTweets(options))
    .then(data => tweetRepository.saveBulk(data.reverse()))
    .then((numberOfSavedTweets) => {
      console.log('Number of saved tweets: ', numberOfSavedTweets);
      res.redirect('/tweets');
    })
    .catch(err => res.render('error', { error: err }));
});

/* API endpoints */

router.get('/page/:page', (req, res) => {
  const { page } = req.params;
  const limit = 50;

  tweetRepository.fetchPage(limit, page)
    .then((data) => {
      res.json({ tweets: data.rows });
    });
});

module.exports = router;
