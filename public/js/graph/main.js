const openModalButton = document.getElementById('words-modal');
const modalBody = document.getElementById('edit-words-list');

const { el, mount, unmount } = window.redom;

openModalButton.onclick = () => {
  modalBody.classList.add('is-active');
  document.getElementById('input-word').focus();
  const modalContent = document.querySelector('.modal-card .content');

  const wordList = el('ol#new-words-list');
  mount(modalContent, wordList, modalContent.firstChild);
};
