const express = require('express');
const router = express.Router();
const options = require('../lib/options');
const tweetRepository = require('../repositories/tweetRepository');

const fetchTweets = require('../lib/helpers');

router.get('/', (req, res) => {
    fetchTweets(options)
        .then(data => res.render('tweets', {tweets: data}))
        .catch((err) => res.render('error', {error: err}));
});

router.get('/update', (req, res) => {
    const redirectRoute = '/tweets';

    fetchTweets(options)
        .then(data => {
            tweetRepository.saveBulk(data)
                .then(res.redirect(redirectRoute))
                .catch(err => res.render('error', {error, err}))
        })
        .catch(err => res.render('error', {error: err}));
});

module.exports = router;
