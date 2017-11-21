class ListItem {
  constructor(word) {
    const { el } = window.redom;
    this.elem = el(
      'li.word-wrapper',
      this.word = el('span', word),
      this.removeIcon = el('i.fa.fa-times', { 'aria-hidden': true }),
    );
    this.removeIcon.onclick = () => {
      this.elem.remove();
    };
  }
}

module.exports = ListItem;
