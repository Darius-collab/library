let library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  const readStatus = this.read ? 'read' : 'not read yet';
  return `${title} by ${author}, ${pages} pages, ${readStatus}`;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
}

library.push(new Book('The God of the Woods', 'Liz Moore', 496, false));

function addBookToLibrary(data) {
  library.push(new Book(...data));
}

function displayBooks() {
  const bookList = document.getElementById('books');
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild);
  }
  library.map(createBookListItem).forEach(li => bookList.appendChild(li));
}

function createBookListItem(book, i) {
  const li = document.createElement('li');
  li.className = 'book-card';

  const cover = document.createElement('div');
  cover.className = 'book-card__image-placeholder';
  li.appendChild(cover);

  const description = document.createElement('div');
  description.className = 'book-card__description';
  li.appendChild(description);

  [
    createParagraph(book.title),
    createParagraph(`by ${book.author}`),
    createParagraph(`${book.pages} pages`, 'text--secondary'),
  ].forEach(p => description.appendChild(p));

  const readButton = document.createElement('button');
  readButton.className = 'button button--small button--full-width';
  readButton.classList.add(book.read ? 'button--positive' : 'button--secondary');
  readButton.textContent = book.read ? 'Read' : 'Mark as read';
  readButton.addEventListener('click', () => {
    book.toggleRead();
    displayBooks();
  });
  description.appendChild(readButton);

  const removeButton = document.createElement('button');
  removeButton.className = 'icon-button';
  removeButton.addEventListener('click', () => removeBook(i));
  li.appendChild(removeButton);

  return li;
}

function createParagraph(text, className) {
  const p = document.createElement('p');
  p.textContent = text;
  if (className) p.className = className;

  return p;
}

function removeBook(bookIndex) {
  library = library.filter((_book, i) => i !== bookIndex);
  displayBooks();
}

const newBookButton = document.getElementById('new');
newBookButton.addEventListener('click', () => dialog.showModal());
const dialog = document.getElementById('new-book-dialog');
const form = document.getElementById('book-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (e.submitter.value === 'cancel') {
    closeDialog();
    return;
  }

  const formData = new FormData(form);
  let data = [];
  for (const value of formData.values()) {
    data.push(value);
  }
  addBookToLibrary(data);
  closeDialog();
  displayBooks();
});

function closeDialog() {
  dialog.close();
  form.reset();
}


displayBooks();