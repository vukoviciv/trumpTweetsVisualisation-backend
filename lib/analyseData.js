function analyseText(textArray, words) {
    let wordsWithCounters = words.map(w => {
        return {'word': w, 'count': 0}
    });

    textArray.forEach(tweet => {
        let upperCasedTweet = tweet.toUpperCase();
        let wordArray = upperCasedTweet.split(' ');

        wordsWithCounters.forEach(wordObj => {
            if (wordArray.includes(wordObj.word)) {
                wordObj.count++;
            }
        });
    });
    sortDesc(wordsWithCounters);
    return wordsWithCounters;
}

function extractTextProperties(data) {
    return data.map(tweet => tweet.full_text);
}

function sortDesc(wordsWithCounters) {
    return wordsWithCounters.sort((a,b) => b.count - a.count);
}

module.exports = {
    analyseText,
    extractTextProperties
};
