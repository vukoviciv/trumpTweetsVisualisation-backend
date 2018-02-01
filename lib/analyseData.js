const extractTextProperties = data => data.map(tweet => tweet.full_text);

const sortDesc = wordsWithCounters =>
  wordsWithCounters.sort((a, b) => b.count - a.count);

const getWordsWithCountPerTweet = (tweetText, wordsWithCounters) => {
  const clonedWords = wordsWithCounters.map((w) => {
    if (tweetText.includes(` ${w.word} `)) {
      return { word: w.word, count: w.count + 1 };
    }
    return { word: w.word, count: w.count };
  });

  return clonedWords;
};

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

/* We need all words in caps lock and without any non alphabetic chars. */
const cleanUpTextArray = textArray => textArray.map(tweetText => cleanUpTextTweet(tweetText));

const analyseText = (tweetsTextArray, words) => {
  let wordsWithCounters = words.map(word => ({ word, count: 0 }));
  const cleanTextsArray = cleanUpTextArray(tweetsTextArray);

  for (let i = 0; i < cleanTextsArray.length; i += 1) {
    wordsWithCounters = Object.assign(
      wordsWithCounters,
      getWordsWithCountPerTweet(cleanTextsArray[i], wordsWithCounters)
    );
  }

  return sortDesc(wordsWithCounters);
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

module.exports = {
  analyseText,
  extractTextProperties,
  getTweetsContainingTheWord,
};
