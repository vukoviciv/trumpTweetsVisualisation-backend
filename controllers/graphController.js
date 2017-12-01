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
  tweetRepository.getTweetsOrderByFavoriteCount()
    .then((tweets) => {
      const temp = [undefined, 'BAD', 'SAD', 'PRESIDENT', 'GREAT'];
      const test = dataAnalyser.getTweetsContainingTheWord(temp, tweets);
      res.send({
        tweets: test,
        words: temp,
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
