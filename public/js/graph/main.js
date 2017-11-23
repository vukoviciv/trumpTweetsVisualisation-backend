import graph from './d3graph/d3graph';
import lib from './d3graph/lib';
import modalHandlers from './modal/modalHandlers';

const submitWordButton = document.querySelector('.modal #add-word');
const closeModalButton = document.getElementById('cancel');
const inputWord = document.getElementById('input-word');
const submitList = document.querySelector('.modal #submit');
const openModalButton = document.getElementById('words-modal');
const resetToDefaultButton = document.getElementById('reset-to-default');
const modalBody = document.getElementById('edit-words-list');

const resetToDefaultDataHandler = () => {
  const defaultData = lib.getDefaultData();
  window.sessionStorage.removeItem('graphData');

  graph.createGraph(defaultData);
};

graph.fetchGraph();

submitWordButton.onclick = () => modalHandlers.submitWord(submitList);
closeModalButton.onclick = () => modalHandlers.close(modalBody);
inputWord.onkeyup = event => modalHandlers.onKeyUp(event, submitWordButton);
submitList.onclick = () => {
  modalHandlers.submitList();
  modalHandlers.close(modalBody);
};
openModalButton.onclick = modalHandlers.open;
resetToDefaultButton.onclick = resetToDefaultDataHandler;
