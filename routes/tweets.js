const express = require('express');
const router = express.Router();
const options = require('../lib/options');
const tweetRepository = require('../repositories/tweetRepository');

const fetchTweets = require('../lib/helpers');

router.get('/', (req, res) => {
    tweetRepository.fetchAll()
        .then(data => res.render('tweets', {tweets: data}))
        .catch((err) => res.render('error', {error: err}));
});

router.get('/update', (req, res) => {
    const redirectRoute = '/tweets';

    tweetRepository.getNewestTweet()
        .then(lastTweet => {
            options.sinceId = lastTweet.id_str;
            fetchTweets(options)
                .then(data => {
                    tweetRepository.saveBulk(data)
                        .then(data => console.log("Saving in bulk."))
                        .catch(err => res.render('error', {error: err}))
                })
                .then(data => res.redirect(redirectRoute))
                .catch(err => res.render('error', {error: err}))
        })
        .catch(err => console.log(err));
});

module.exports = router;
