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

const getTweetsContainingTheWord = (words, tweetsObjectsArray) => {
  const temp = tweetsObjectsArray.map((tweet) => {
    const tweetClone = Object.assign(tweet, { words: {} });
    const cleanedTweetText = cleanUpTextTweet(tweet.full_text);

    for (let i = 0; i < words.length; i += 1) {
      if (cleanedTweetText.includes(` ${words[i]} `)) tweetClone.words.word = words[i];
    }

    return tweetClone;
  });

  const filtered = temp.filter(tweet => Object.prototype.hasOwnProperty.call(tweet.words, 'word'));
  return filtered;
};

/* end  TEMP */

router.get('/', graphController.indexPage);
router.get('/fetch_graph', graphController.analyseWordsInTweets);
router.get('/test', (req, res) => {
  tweetRepository.getTweetsOrderByFavoriteCount()
    .then((tweets) => {
      const temp = [undefined, 'BAD', 'SAD', 'PRESIDENT', 'GREAT'];
      const test = getTweetsContainingTheWord(temp, tweets);
      res.render('test', {
        tweets: JSON.stringify(test),
        words: JSON.stringify(temp),
      });
    })
    .catch(err => err);
});


module.exports = router;
