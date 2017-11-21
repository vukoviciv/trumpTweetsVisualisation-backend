import ListItem from './listItem';

const submitWordButton = document.querySelector('.modal #add-word');
const submitList = document.querySelector('.modal #submit');
const closeModalButton = document.getElementById('cancel');

const backgroundOverlay = document.querySelector('.modal .background-overlay');
const modalBodyContent = document.querySelector('.modal .modal-card-body');

const submitWordHandler = () => {
  const inputElement = document.getElementById('input-word');
  const text = inputElement.value;
  const wordsList = document.getElementById('new-words-list');

  if (!text) return;

  mount(wordsList, new ListItem(text));

  inputElement.value = '';
  inputElement.focus();

  backgroundOverlay.style.opacity = 1 - (wordsList.children.length * 0.05);
  modalBodyContent.scrollTop = modalBodyContent.scrollHeight;

  submitList.removeAttribute('disabled');
};

const updateGraph = (words) => {
  const url = new URL(`${window.location.href}/fetch_graph`);
  const params = { words };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  fetch(url)
    .then(res => res.json())
    .then(data => createGraph(data))
    .catch(err => console.log(err));
};

const closeModalHandler = () => {
  modalBody.classList.remove('is-active');
  document.getElementById('new-words-list').remove();
  document.getElementById('input-word').value = '';

  backgroundOverlay.style.opacity = 1;
};

const submitListHandler = () => {
  const wordsList = document.getElementById('new-words-list').children;
  if (wordsList.length < 1) return;

  const listElements = new Array(...wordsList);
  const wordsData = listElements.map(item => item.textContent.toUpperCase());

  updateGraph(wordsData);
  closeModalHandler();
};

document.querySelector('#input-word').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    submitWordButton.click();
    e.preventDefault();
  }
});

submitWordButton.onclick = submitWordHandler;
submitList.onclick = submitListHandler;
closeModalButton.onclick = closeModalHandler;
