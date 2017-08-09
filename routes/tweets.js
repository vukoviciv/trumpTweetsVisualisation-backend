const express = require('express');
const router = express.Router();
const options = require('../lib/options');

const fetchTweets = require('../lib/helpers');

router.get('/', (req, res) => {
    fetchTweets(options)
        .then(data => res.render('tweets', {tweets: data}))
        .catch((err) => res.render('error', {error: err}));
});

//router.post('/update', (req, res) => {
//    fetchTweets(options)
//        .then(data => {
//
//        })
//        .catch((err) => res.render('error', {error: err}));
//});

module.exports = router;