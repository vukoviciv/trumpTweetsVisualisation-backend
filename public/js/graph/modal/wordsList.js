const submitWordButton = document.getElementById('add-word');
const backgroundOverlay = document.querySelector('.modal .background-overlay');

const submitWordHandler = () => {
  const inputElement = document.getElementById('input-word');
  const text = inputElement.value;
  const wordsList = document.getElementById('new-words-list');

  if (!text) return;

  mount(wordsList, new ListItem(text));

  inputElement.value = '';
  inputElement.focus();

  backgroundOverlay.style.opacity = 1 - (wordsList.children.length * 0.05);
};

submitWordButton.onclick = submitWordHandler;

document.querySelector('#input-word').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    submitWordButton.click();
    e.preventDefault();
  }
});

