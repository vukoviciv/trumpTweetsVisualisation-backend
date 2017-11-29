const express = require('express');
const graphController = require('../controllers/graphController');

const router = express.Router();

/* TEMP */
const tweetRepository = require('../repositories/tweetRepository');
const analyse = require('../lib/analyseData');

const cleanUpTextTweet = (tweetText) => {
  const removedSigns = tweetText.replace(/[^\w\s\'']/g, ' ');
  return removedSigns.toUpperCase();
};

const getTweetsContainingTheWord = (word, tweetsArray) =>
  tweetsArray.filter((tweet) => {
    const cleanedTweet = cleanUpTextTweet(tweet);
    if (cleanedTweet.contains(` ${word} `)) {
      console.log('BInGO');
      console.log(tweet.full_text);
    }
    return cleanedTweet.contains(` ${word} `);
  });

/* end  TEMP */

router.get('/', graphController.indexPage);
router.get('/fetch_graph', graphController.analyseWordsInTweets);
router.get('/test', (req, res) => {
  tweetRepository.getTweetsOrderByFavoriteCount()
    .then((tweets) => {
      let aa = getTweetsContainingTheWord('GREAT', tweets);
      let test = JSON.stringify(tweets);
      res.render('test', {
        tweets: test,
        t: 12,
      });
    })
    .catch(err => err);
});


module.exports = router;
