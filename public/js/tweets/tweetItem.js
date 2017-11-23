export default class TweetListItem {
  constructor(tweet) {
    const { el } = window.redom;
    this.elem = el(
      'li.tweet',
      this.text = el('span.text', tweet.full_text),
      this.createdAt = el('span.time', `${tweet.created_at}`),
    );
  }
}
