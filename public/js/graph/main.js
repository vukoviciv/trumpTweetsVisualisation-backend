const openModalButton = document.getElementById('words-modal');
const closeModalButton = document.getElementById('cancel');
const modalBody = document.getElementById('edit-words-list');

openModalButton.onclick = () => {
  modalBody.classList.add('is-active');
  document.getElementById('input-word').focus();
};

closeModalButton.onclick = () => {
  modalBody.classList.remove('is-active');
};
