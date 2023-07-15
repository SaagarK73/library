function Book(name, author, pages, isRead) {
    this.name = name;
    this.author = author;    
    this.pages = pages;
    this.isRead = isRead;
    this.updateReadStatus = function() {
        this.isRead = isRead;
    }
}

const addButton = document.querySelector('.add');
const bookForm = document.querySelector('.form');
const deleteButtons = document.querySelectorAll('.delete');
const checkbox = document.querySelector('.input-group:nth-of-type(4) input');
let bookArray = [];

addButton.addEventListener('click', expandModal);
document.addEventListener('mouseup', shrinkModal);

function expandModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add("display");
}

function shrinkModal(e) {
    const modal = document.querySelector('.modal');
    const isModalDisplayed = document.querySelector('.modal.display');
    if (isModalDisplayed && !modal.contains(e.target)) {
        modal.classList.remove(...modal.classList);
        modal.classList.add("modal");
    }
}

function deleteBook(e) {
    const bookTitle = e.target.parentNode.firstChild.innerHTML;
    bookArray = bookArray.filter(book => book.name != bookTitle)
    displayBooks(bookArray);
}

function toggleReadStatus(e) {
    const bookTitle = e.target.parentNode.firstChild.innerHTML;
    index = bookArray.findIndex(book => book.name === bookTitle);
    bookArray[index].isRead = !bookArray[index].isRead;
    displayBooks(bookArray);
}

bookForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const modal = document.querySelector('.modal');
    modal.classList.remove(...modal.classList);
    modal.classList.add("modal");
    bookArray.push(new Book
        (e.currentTarget.bookName.value, e.currentTarget.author.value, e.currentTarget.pages.value, checkbox.checked)) 
    console.log(bookArray);
    displayBooks(bookArray);
})

function displayBooks(bookArray) {
    const displayConsole = document.querySelector('#content');
    displayConsole.replaceChildren();

    bookArray.forEach(book => {
        createBookElement(book);
    });
}

function createBookElement(book) {
    const displayConsole = document.querySelector('#content');

    const node = document.createElement("div");
    node.classList.add('books');
    displayConsole.appendChild(node);

    const bookName = document.createElement("div");
    const author = document.createElement("div");
    const pages = document.createElement("div");    
    const readStatus= document.createElement("div");
    const deleteButton = document.createElement("div");

    bookName.classList.add("bookName");
    author.classList.add("author");
    pages.classList.add("pages");
    readStatus.classList.add("isRead");
    readStatus.onclick = toggleReadStatus;

    deleteButton.classList.add("delete")
    deleteButton.onclick = deleteBook;

    bookName.textContent = book.name;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    readStatus.textContent = book.isRead ? "Read" : "Unread";
    deleteButton.textContent = "DELETE";

    node.appendChild(bookName);
    node.appendChild(author);    
    node.appendChild(pages);
    node.appendChild(readStatus);    
    node.appendChild(deleteButton);
}
