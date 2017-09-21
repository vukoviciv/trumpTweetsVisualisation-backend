function analyseText(textArray, words) {
    textArray.forEach(tweet => {
        let upperCasedTweet = tweet.toUpperCase();
        let wordArray = upperCasedTweet.split(' ');

        words.forEach(wordObj => {
            if (wordArray.includes(wordObj.word)) {
                wordObj.count++;
            }
        });
    });

    console.log(words);
    return textArray;
}

function extractTextProperties(data) {
    return data.map(tweet => tweet.full_text);
}

module.exports = {
    analyseText,
    extractTextProperties
};