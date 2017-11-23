import TweetListItem from './tweetItem';

let page = 1;

const modifyDateFormat = (tweet) => {
  let parsedTime = new Date(Date.parse(tweet.created_at));
  parsedTime = `${parsedTime.toLocaleTimeString()}, ${parsedTime.toDateString()}`;

  const clonedTweet = Object.assign({}, tweet);
  clonedTweet.created_at = parsedTime;
  return clonedTweet;
};

const getTweetHTMLcomponent = tweet => new TweetListItem(modifyDateFormat(tweet));

const fetchNewPage = () => {
  fetch(`/tweets/${page}`)
    .then(res => res.json())
    .then(data => data.tweets.map(tweet => getTweetHTMLcomponent(tweet)))
    .then((tweets) => {
      const listElement = document.getElementById('tweet-items-container');
      tweets.forEach(liEl => listElement.append(liEl.elem));
      page += 1;
    });
};

const loadMoreAtTheBottom = () => {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
    fetchNewPage();
  }
};

fetchNewPage();
window.addEventListener('scroll', window._.throttle(loadMoreAtTheBottom, 500));
