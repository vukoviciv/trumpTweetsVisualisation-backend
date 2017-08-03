const express = require('express');
const router = express.Router();

const {twit} = require('../lib/twitter');
let queryParams = require('../lib/options');

const fetchTweets = require('../public/js/handleTweets');

router.get('/', (req, res) => {
    let tweets = [];
    delete queryParams.max_id;

    fetchTweets(twit, tweets, queryParams)
        .then((data) => res.render('tweets', {tweets: data}))
        .catch((err) => res.render('error', {error: err}));
});

module.exports = router;