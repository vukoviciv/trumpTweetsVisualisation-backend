const express = require('express');
const tweetRepository = require('../repositories/tweetRepository');
const analysedataAnalyser = require('../lib/analyseData');
const { words } = require('../lib/options');

const router = express.Router();

router.get('/', (req, res) => {
  tweetRepository.fetchAll()
    .then(data => analysedataAnalyser.extractTextProperties(data))
    .then(textArray => analysedataAnalyser.analyseText(textArray, words))
    .then(analysedText => res.render('graph', {
      tweets: JSON.stringify(analysedText),
    }))
    .catch(err => res.render('error', { error: err }));
});

router.get('/words', (req, res) => {
  res.send('bravo');
});

module.exports = router;
