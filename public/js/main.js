"use strict";

window.addEventListener('scroll', _.throttle(loadMoreAtTheBottom, 500));
var page = 1;

function fetchNewPage() {
    fetch(`/tweets/${page}`)
        .then(res =>  res.json())
        .then(data => data.tweets.map(tweet => getTweetHTMLcomponent(tweet)))
        .then(tweets => {
            const listElement = document.getElementById('tweet-items-container');
            tweets.forEach(el => listElement.insertAdjacentHTML('beforeend', el));
            page++;
        });
}

function getTweetHTMLcomponent(tweet) {
    return `<li class='tweet'>
                <span class='text'>${tweet.full_text}</span>
	            <span class='time'>${tweet.created_at}</span>
            </li>`;
}

function loadMoreAtTheBottom() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        fetchNewPage();
    }
}

