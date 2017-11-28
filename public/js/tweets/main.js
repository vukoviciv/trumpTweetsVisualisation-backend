import TweetListItem from './tweetItem';

const bodyContainer = document.body;
const profilePictureContainer = document.getElementsByClassName('header-profile-picture')[0];
const profilePictureContainerHeight = profilePictureContainer.offsetHeight;
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
  fetch(`/tweets/page/${page}`)
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

const attachOrRemoveFixedClassToBody = () => {
  if (window.scrollY >= profilePictureContainerHeight * 2) bodyContainer.classList.add('fixed-picture');
  else {
    bodyContainer.classList.remove('fixed-picture');
    profilePictureContainer.style.transform = '';
  }
};

const mouseOverTrumpHandler = (event) => {
  if (!bodyContainer.classList.contains('fixed-picture')) return;
  profilePictureContainer.style.transform = `translateY(-${event.screenY - profilePictureContainer.offsetHeight}px) scale(0.5)`;
};

const mouseOutTrumpHandler = () => {
  if (!bodyContainer.classList.contains('fixed-picture')) return;
  profilePictureContainer.style.transform = 'scale(0.5) translateY(30%)';
};

fetchNewPage();
profilePictureContainer.addEventListener('mouseover', event => mouseOverTrumpHandler(event));
profilePictureContainer.addEventListener('mouseout', window._.throttle(mouseOutTrumpHandler, 5000));

window.addEventListener('scroll', window._.throttle(loadMoreAtTheBottom, 500));
window.addEventListener('scroll', window._.throttle(attachOrRemoveFixedClassToBody, 500));
