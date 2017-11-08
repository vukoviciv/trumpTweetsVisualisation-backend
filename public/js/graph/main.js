const openModalButton = document.getElementById('words-modal');
const closeModalButton = document.getElementById('cancel');
const modalBody = document.getElementById('edit-words-list');

const { el, mount } = window.redom;

openModalButton.onclick = () => {
  modalBody.classList.add('is-active');
  document.getElementById('input-word').focus();
  const modalContent = document.querySelector('.modal-card .content');

  const wordList = el('ol#new-words-list');
  mount(modalContent, wordList, modalContent.firstChild);
};

closeModalButton.onclick = () => {
  modalBody.classList.remove('is-active');
  document.getElementById('new-words-list').remove();
  document.getElementById('input-word').value = '';

  const backgroundOverlay = document.querySelector('.modal .background-overlay');  
  backgroundOverlay.style.opacity = 1;
};
