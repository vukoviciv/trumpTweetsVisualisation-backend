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


// TODO: solve the issue of initial storing of tweets.
//router.get('/update', (req, res) => {
//    const redirectRoute = '/tweets';
//
//    tweetRepository.getLastEntry().then(lastTweet => {
//            let lastTweetId = lastTweet ? lastTweet.id_str : null;
//
//            fetchTweets(options, lastTweetId)
//                .then(data => {
//                    tweetRepository.saveBulk(data)
//                        .then(data => console.log(data))
//                        .catch(err => res.render('error', {error, err}))
//                })
//                .then(data => res.redirect(redirectRoute))
//                .catch(err => res.render('error', {error: err}));
//        })
//        .catch(error => console.log(error));
//});

router.get('/update', (req, res) => {
    const redirectRoute = '/tweets';

    tweetRepository.getNewestTweet()
        .then(lastTweet => {

            console.log(lastTweet.id_str, lastTweet.full_text);

            options.sinceId = lastTweet.id_str;
            fetchTweets(options)
                .then(data => {
                    tweetRepository.saveBulk(data)
                        .then(data => console.log(data))
                        .catch(err => res.render('error', {error: err}))
                })
                .then(data => res.redirect(redirectRoute))
                .catch(err => res.render('error', {error: err}))
        })
        .catch(err => console.log(err));
});

module.exports = router;
