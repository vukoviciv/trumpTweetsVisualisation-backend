const express = require('express');
const options = require('../lib/options');
const tweetRepository = require('../repositories/tweetRepository');
const userRepository = require('../repositories/userRepository');

const router = express.Router();

const { fetchTweets, fetchLastRawTweet, getLargeProfileImageFromSmall } = require('../lib/helpers');

router.get('/', (req, res) => {
  const limit = 50;

  let page = 1;
  let profile;
  userRepository.getProfileAndBackgroundUrl()
    .then((data) => {
      profile = {
        image: getLargeProfileImageFromSmall(data.profile_image_url_https),
        banner: data.profile_banner_url,
      };
    })
    .then(tweetRepository.fetchPage(page, limit)
      .then((data) => {
        page += 1;
        res.render('tweets', {
          tweets: data.rows,
          baseUrl: 'tweets',
          nextPageUrl: `${page}`,
          profile,
        });
      }))
    .catch(err => res.render('error', { error: err }));
});

router.get('/update', (req, res) => {
  const redirectRoute = '/tweets';
  tweetRepository.getNewestTweet()
    .then((lastTweet) => {
      options.queryParams.since_id = lastTweet.id_str;

      // TODO: extract
      fetchLastRawTweet(lastTweet.id_str, options.tweetsUrl)
        .then(({ data }) => {
          if (data[0]) {
            userRepository.findAndUpdate(data[0].user);
          }
        });

      fetchTweets(options)
        .then((data) => {
          // reverse data so we have newest tweet last wrote in db
          const reversedData = data.reverse();
          tweetRepository.saveBulk(reversedData)
            .then(numberOfSavedTweets => console.log('Number of saved tweets: ', numberOfSavedTweets))
            .catch(err => res.render('error', { error: err }));
        })
        .then(res.redirect(redirectRoute))
        .catch(err => res.render('error', { error: err }));
    })
    .catch(err => console.log(err));
});

router.get('/:page', (req, res) => {
  let { page } = req.params;
  const limit = 50;

  tweetRepository.fetchPage(page, limit)
    .then((data) => {
      page += 1;
      res.json({
        tweets: data.rows,
        nextPageUrl: `${page}`,
      });
    });
});

module.exports = router;
