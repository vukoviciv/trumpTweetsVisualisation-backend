const express = require('express');
const graphController = require('../controllers/graphController');

const router = express.Router();

/* TEMP */
const tweetRepository = require('../repositories/tweetRepository');

const cleanUpTextTweet = (tweetText) => {
  const removedSigns = tweetText.replace(/[^\w\s\'']/g, ' ');
  const upperCased = removedSigns.toUpperCase();
  const splited = upperCased.split(' ');
  const removedNonWords = splited.filter((str) => {
    if (str.length > 1) return str;
    return (str === 'A' || str === 'I');
  });
  return ` ${removedNonWords.join(' ')}`;
};

const getTweetsContainingTheWord = (word, tweetsObjectsArray) => {
  const temp = tweetsObjectsArray.map(tweet => Object.assign(tweet, { count: 0 }));
  const test = temp.map((tweet) => {
    const cleanedTweet = cleanUpTextTweet(tweet.full_text);

    if (cleanedTweet.includes(` ${word} `)) {
      return Object.assign(tweet, { count: tweet.count + 1, words: { word } });
    }
    return tweet;
  });

  return test;
};

/* end  TEMP */

router.get('/', graphController.indexPage);
router.get('/fetch_graph', graphController.analyseWordsInTweets);
router.get('/test', (req, res) => {
  tweetRepository.getTweetsOrderByFavoriteCount()
    .then((tweets) => {
      const test = getTweetsContainingTheWord('PRESIDENT', tweets);
      res.render('test', {
        tweets: JSON.stringify(test),
      });
    })
    .catch(err => err);
});


module.exports = router;
