
const express = require('express');
const router = express.Router();
const options = require('../lib/options');
const tweetRepository = require('../repositories/tweetRepository');

const fetchTweets = require('../lib/helpers');

router.get('/', (req, res) => {
    console.log("sasdsdsa");
    let page = req.params.page;
    let limit = 50;

    tweetRepository.fetchPage(page, limit)
        .then(data => {
            res.render('tweets', {
                tweets: data.rows,
                baseUrl: 'tweets'
            })
        })
        .catch((err) => res.render('error', {error: err}));
});

router.get('/update', (req, res) => {
    const redirectRoute = '/tweets';

    tweetRepository.getNewestTweet()
        .then(lastTweet => {
            options.queryParams.since_id = lastTweet.id_str;

            fetchTweets(options)
                .then(data => {
                    const reversedData = data.reverse(); // reverse data so we have newest tweet last wrote in db
                    tweetRepository.saveBulk(reversedData)
                        .then(data => console.log("Saving in bulk."))
                        .catch(err => res.render('error', {error: err}))
                })
                .then(data => res.redirect(redirectRoute))
                .catch(err => res.render('error', {error: err}))
        })
        .catch(err => console.log(err));
});

router.get('/:page', (req, res)=> {
    let page = req.params.page;
    let limit = 50;

    tweetRepository.fetchPage(page, limit)
        .then(
            data => res.status(200).json({'tweets': data.rows})
        );
});

module.exports = router;
