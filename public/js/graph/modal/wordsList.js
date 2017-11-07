const submitWordButton = document.getElementById('add-word');
const wordsList = document.getElementById('new-words-list');

const submitWordHandler = () => {
  const { mount } = window.redom;
  const inputElement = document.getElementById('input-word');
  const text = inputElement.value;

  if (!text) return;

  mount(wordsList, new ListItem(text));

  inputElement.value = '';
  inputElement.focus();
};

submitWordButton.onclick = submitWordHandler;
document.querySelector('#input-word').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    submitWordButton.click();
    e.preventDefault();
  }
});
