import graph from './d3graph/d3graph';
import modalHandlers from './modal/modalHandlers';

const submitWordButton = document.querySelector('.modal #add-word');
const closeModalButton = document.getElementById('cancel');
const inputWord = document.getElementById('input-word');
const submitList = document.querySelector('.modal #submit');
const openModalButton = document.getElementById('words-modal');

const modalBody = document.getElementById('edit-words-list');

graph.fetchGraph();

/* Modal handlers */
submitWordButton.onclick = () => modalHandlers.submitWord(submitList);
closeModalButton.onclick = () => modalHandlers.close(modalBody);
inputWord.onkeyup = event => modalHandlers.onKeyUp(event, submitWordButton);
submitList.onclick = () => {
  modalHandlers.submitList();
  modalHandlers.close(modalBody);
};
openModalButton.onclick = modalHandlers.open;
