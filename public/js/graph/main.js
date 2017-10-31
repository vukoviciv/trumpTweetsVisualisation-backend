const openModalButton = document.getElementById('words-modal');
const closeModalButton = document.getElementById('close-words-modal');
const modalBody = document.getElementById('edit-words-list');

openModalButton.onclick = () => {
  modalBody.classList.add('is-active');
};

closeModalButton.onclick = () => {
  modalBody.classList.remove('is-active');
};
