function analyseText(textArray, words) {

    let w = [...words];
    eval(require('locus'));

    textArray.forEach(tweet => {
        let upperCasedTweet = tweet.toUpperCase();
        let wordArray = upperCasedTweet.split(' ');

        w.forEach(wordObj => {
            if (wordArray.includes(wordObj.word)) {
                wordObj.count++;
            }
        });
    });

    console.log(w);
    return w;
}

function extractTextProperties(data) {
    return data.map(tweet => tweet.full_text);
}

module.exports = {
    analyseText,
    extractTextProperties
};