function handleOnClickLoadMore(page) {
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
