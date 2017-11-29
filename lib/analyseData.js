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

/* We need all words in caps lock and without any non alphabetic chars. */
const cleanUpTextArray = (textArray) => {
  const removedSigns = textArray.map(tweet => tweet.replace(/[^\w\s\'']/g, ' '));
  const upperCased = removedSigns.map(tweet => tweet.toUpperCase());
  const removedNonWordLetters = upperCased.map((tweet) => {
    const splited = tweet.split(' ');
    const removedNonWords = splited.filter((str) => {
      if (str.length > 1) return str;
      return (str === 'A' || str === 'I');
    });

    return ` ${removedNonWords.join(' ')}`; // We need whitespace at the beginning
  });

  return removedNonWordLetters;
};

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

module.exports = {
  analyseText,
  extractTextProperties,
  /* temp */
  cleanUpTextArray,
};
