class ListItem {
  constructor(word) {
    this.el = el(
      'li.word-wrapper',
      this.word = el('span', word),
      this.removeIcon = el('i.fa.fa-times', { 'aria-hidden': true }),
    );
    this.removeIcon.onclick = () => {
      this.el.remove();
    };
  }
}
