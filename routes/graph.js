const express = require('express');
const router = express.Router();
const tweetRepository = require('../repositories/tweetRepository');
const analysedataAnalyser = require('../lib/analyseData');
const { words } = require('../lib/options');


router.get('/', (req, res) => {
    tweetRepository.fetchAll() // switch to fetchAll after
        .then(data => analysedataAnalyser.extractTextProperties(data))
        .then(textArray => {
            return analysedataAnalyser.analyseText(textArray, words)
        })
        .then(analysedText => res.render('graph', {tweets: JSON.stringify(analysedText)}))
        .catch((err) => res.render('error', {error: err}));
});

module.exports = router;