const tweetRepository = require('../repositories/tweetRepository');
const dataAnalyser = require('../lib/analyseData');
const { defaultWords } = require('../lib/options');

const analyseWordsInTweets = (req, res) => {
  const words = req.query.words ? req.query.words.split(',') : defaultWords;
  const uniqueWords = Array.from(new Set(words));
  tweetRepository.fetchAll()
    .then(data => dataAnalyser.extractTextProperties(data))
    .then(textArray => dataAnalyser.analyseText(textArray, uniqueWords))
    .then(analysedText => res.send(analysedText))
    .catch(err => res.render('error', { error: err }));
};

const correlationGraph = (req, res) => {
  const fetchedWords = req.query.words ? req.query.words.split(',') : defaultWords;
  const uniqueWords = Array.from(new Set(fetchedWords));
  tweetRepository.getTweetsOrderByFavoriteCount()
    .then((tweets) => {
      // we need first one empty to avoid overlaping with x axis
      const words = [undefined].concat(uniqueWords);
      const tweetsContainingWords = dataAnalyser.getTweetsContainingTheWord(words, tweets);
      res.send({
        tweets: tweetsContainingWords,
        words,
      });
    })
    .catch(err => err);
};

const indexPage = (req, res) => {
  res.render('graphs/graph');
};

const correlationGraphPage = (req, res) => {
  res.render('graphs/correlationGraph');
};

module.exports = {
  analyseWordsInTweets,
  correlationGraph,
  correlationGraphPage,
  indexPage,
};
