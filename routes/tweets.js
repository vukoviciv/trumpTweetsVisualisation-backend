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
            console.log("data: ", data);
            tweetRepository.saveOne(data[0])
                .then(res.redirect(redirectRoute))
        })
        .catch((err) => res.render('error', {error: err}));

    // TODO: get all tweets and store it


});

module.exports = router;
