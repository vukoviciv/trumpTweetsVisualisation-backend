const tweetRepository = require('../repositories/tweetRepository');
const dataAnalyser = require('../lib/analyseData');
const { defaultWords } = require('../lib/options');

const analyseWordsInTweets = (req, res) => {
  const words = req.query.words ? req.query.words.split(',') : defaultWords;
  tweetRepository.fetchAll()
    .then(data => dataAnalyser.extractTextProperties(data))
    .then(textArray => dataAnalyser.analyseText(textArray, words))
    .then(analysedText => res.send(analysedText))
    .catch(err => res.render('error', { error: err }));
};

const indexPage = (req, res) => {
  res.render('graph');
};

module.exports = {
  analyseWordsInTweets,
  indexPage,
};
