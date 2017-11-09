class TweetListItem {
  constructor(tweet) {
    this.el = el(
      'li.tweet',
      this.text = el('span.text', tweet.full_text),
      this.createdAt = el('span.time', `${tweet.created_at}`),
    );
  }
}
