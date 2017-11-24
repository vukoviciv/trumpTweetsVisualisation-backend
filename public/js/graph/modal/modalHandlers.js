import ListItem from './listItem';
import graph from '../d3graph/d3graph';

/* Helper functions */

const updateGraph = (words) => {
  const url = new URL(`${window.location.href}/fetch_graph`);
  const params = { words };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  fetch(url)
    .then(res => res.json())
    .then((data) => {
      window.sessionStorage.setItem('graphData', JSON.stringify(data));
      graph.create(data);
    })
    .catch(err => console.log(err));
};

/* Handlers */

const submitWordHandler = (submitList) => {
  const inputElement = document.getElementById('input-word');
  const text = inputElement.value;
  const wordsList = document.getElementById('new-words-list');
  const backgroundOverlay = document.querySelector('.modal .background-overlay');
  const modalBodyContent = document.querySelector('.modal .modal-card-body');

  if (!text) return;

  const newListItem = new ListItem(text);
  wordsList.append(newListItem.elem);

  inputElement.value = '';
  inputElement.focus();

  backgroundOverlay.style.opacity = 1 - (wordsList.children.length * 0.05);
  modalBodyContent.scrollTop = modalBodyContent.scrollHeight;

  submitList.removeAttribute('disabled');
};

const closeModalHandler = (modalBody) => {
  const backgroundOverlay = document.querySelector('.modal .background-overlay');
  const newWordsList = document.getElementById('new-words-list');

  if (newWordsList) newWordsList.remove();

  modalBody.classList.remove('is-active');
  document.getElementById('input-word').value = '';

  backgroundOverlay.style.opacity = 1;
};

const submitListHandler = () => {
  const wordsList = document.getElementById('new-words-list').children;
  if (wordsList.length < 1) return;

  const listElements = new Array(...wordsList);
  const wordsData = listElements.map(item => item.textContent.toUpperCase());

  updateGraph(wordsData);
};

const onKeyUpHandler = (event, button) => {
  if (event.key === 'Enter') {
    button.click();
    event.preventDefault();
  }
};

const openModalHandler = () => {
  const { el, mount } = window.redom;
  const modalBody = document.getElementById('edit-words-list');

  modalBody.classList.add('is-active');
  document.getElementById('input-word').focus();
  const modalContent = document.querySelector('.modal-card .content');

  const wordList = el('ol#new-words-list');
  mount(modalContent, wordList, modalContent.firstChild);
};

module.exports = {
  submitWord: submitWordHandler,
  submitList: submitListHandler,
  close: closeModalHandler,
  onKeyUp: onKeyUpHandler,
  open: openModalHandler,
};
