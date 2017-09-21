const express = require('express');
const router = express.Router();
const tweetRepository = require('../repositories/tweetRepository');

router.get('/', (req, res) => {
    tweetRepository.fetchAll()
        .then(data => {

            res.render('graph', {tweets: JSON.stringify(data)})
        })
        .catch((err) => res.render('error', {error: err}));
});

module .exports = router;