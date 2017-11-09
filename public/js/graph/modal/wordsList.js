const submitWordButton = document.querySelector('.modal #add-word');
const submitList = document.querySelector('.modal #submit');
const backgroundOverlay = document.querySelector('.modal .background-overlay');
const modalBodyContent = document.querySelector('.modal .modal-card-body');

const submitWordHandler = () => {
  const inputElement = document.getElementById('input-word');
  const text = inputElement.value;
  const wordsList = document.getElementById('new-words-list');
  const modalBody = document.getElementById('edit-words-list');

  if (!text) return;

  mount(wordsList, new ListItem(text));

  inputElement.value = '';
  inputElement.focus();

  backgroundOverlay.style.opacity = 1 - (wordsList.children.length * 0.05);
  modalBodyContent.scrollTop = modalBodyContent.scrollHeight;
};

const sendData = (words) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/graph/words', true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify({ words }));
};

const submitListHandler = () => {
  const wordsList = document.getElementById('new-words-list').children;
  const listElements = new Array(...wordsList);
  const wordsData = listElements.map(item => item.textContent);

  sendData(wordsData);
};

document.querySelector('#input-word').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    submitWordButton.click();
    e.preventDefault();
  }
});

submitWordButton.onclick = submitWordHandler;
submitList.onclick = submitListHandler;

