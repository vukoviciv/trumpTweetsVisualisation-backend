const express = require('express');
const router = express.Router();
const options = require('../lib/options');
const tweetRepository = require('../repositories/tweetRepository');
const userRepository = require('../repositories/userRepository');

const {fetchTweets, fetchLastRawTweet, getLargeProfileImageFromSmall} = require('../lib/helpers');

router.get('/', (req, res) => {
    let page = 1;
    let limit = 50;
    let profile;

    userRepository.getProfileAndBackgroundUrl()
        .then(data => {
            profile = {
                image: getLargeProfileImageFromSmall(data.profile_image_url_https),
                banner: data.profile_banner_url
            }
        })
        .then(tweetRepository.fetchPage(page, limit)
            .then(data => {
                page++;
                res.render('tweets', {
                    tweets: data.rows,
                    baseUrl: 'tweets',
                    nextPageUrl: `${page}`,
                    profile: profile
                })
            }))
        .catch((err) => res.render('error', {error: err}));
});

router.get('/update', (req, res) => {
    const redirectRoute = '/tweets';

    tweetRepository.getNewestTweet()
        .then(lastTweet => {
            options.queryParams.since_id = lastTweet.id_str;

            fetchLastRawTweet(lastTweet.id_str, options.tweetsUrl)
                .then(({data, resp}) => {
                    if (data[0]) {
                        userRepository.findAndUpdate(data[0].user);
                    }
                });

            fetchTweets(options)
                .then(data => {
                    const reversedData = data.reverse(); // reverse data so we have newest tweet last wrote in db
                    tweetRepository.saveBulk(reversedData)
                        .then(data => { console.log("Number of saved tweets: ", data); })
                        .catch(err => res.render('error', {error: err}))
                })
                .then(data => res.redirect(redirectRoute))
                .catch(err => res.render('error', {error: err}))
        })
        .catch(err => console.log(err));
});

router.get('/:page', (req, res) => {
    let page = req.params.page;
    let limit = 50;

    tweetRepository.fetchPage(page, limit)
        .then(
            data => {
                page++;
                res.json({
                    tweets: data.rows,
                    nextPageUrl: `${page}`
                })
            }
        );
});

module.exports = router;
