export default class TweetListItem {
  constructor(tweet) {
    const { el } = window.redom;
    this.elem = el(
      'li.tweet',
      this.text = el(
        'span.text-wrapper',
        this.fullText = el('span.text', `${tweet.full_text}`),
      ),
      this.assets = el(
        'span.time-count-wrapper',
        this.favoriteCount = el(
          'span.favorite-count',
          el('i.fa.fa-heart-o'),
          el('span', ` ${tweet.favorite_count}`),
        ),
        this.createdAt = el('span.time', `${tweet.created_at}`),
      ),
    );
  }
}
