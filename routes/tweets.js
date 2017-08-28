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

    // get current and store it
    tweetRepository
        .saveOne()
        .then(res.redirect(redirectRoute));

    // TODO: get all tweets and store it
});

module.exports = router;
