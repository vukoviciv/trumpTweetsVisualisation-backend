window.page = 1;
window.fetching = false;

function fetchNewPage() {
	console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
		fetch(`/tweets/${page}`)
			.then(res => res.json())
			.then(data => data.tweets.map(tweet => getTweetHTMLcomponent(tweet)))
			.then(tweets => {
				let listElement = document.getElementById('tweet-items-container');
				tweets.forEach(el => listElement.insertAdjacentHTML('beforeend', el) )			
			});
}

function getTweetHTMLcomponent(tweet) {
	var liItem = `<li class='tweet'>
		<span class='text'>${tweet.full_text}</span>
		<span class='time'>${tweet.created_at}</span>
	</li>`	

	return liItem;
}

window.addEventListener('scroll', loadMoreAtTheBottom);




function loadMoreAtTheBottom() {
	console.log(window.innerHeight + window.scrollY);
	console.log(document.body.offsetHeight);
	if((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50)	{
			setTimeout(function() {
				fetchNewPage();
			}, 500);
	}
}

