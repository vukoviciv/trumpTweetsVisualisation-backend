function analyseText(textArray, words) {
    let wordsWithCounters = words.map(w => {
        return {'word': w, 'count': 0}
    });

    textArray.forEach(tweet => {
        let upperCasedTweet = tweet.toUpperCase();
        let wordArray = upperCasedTweet.split(' ');

        wordsWithCounters.forEach(wordObj => {
            //eval(require('locus'));
            if (wordArray.includes(wordObj.word)) {
                wordObj.count++;
            }
        });
    });

    return wordsWithCounters;
}

function extractTextProperties(data) {
    return data.map(tweet => tweet.full_text);
}

module.exports = {
    analyseText,
    extractTextProperties
};