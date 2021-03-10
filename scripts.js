const myLibrary = [];
let bookList;

function Book(title, author, numberOfPages, read) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
    this.isRead = function (read) {
        this.read = read;
    };
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.numberOfPages} ${(this.numberOfPages === 1 ? 'page' : 'pages')}, ${read ? 'already read': 'not read yet'}`;
    };
}

window.onload = () => {

    const titleInp = document.getElementById('title');
    const newBookForm = document.getElementById('newBookForm');
    const showFormBtn = document.getElementById('showFormBtn');
    const authorInp = document.getElementById('author');
    const numPagesInp = document.getElementById('numPages');
    const readInp = document.getElementById('read');
    const infoMsg = document.getElementById('infoMsg');
    bookList = document.getElementById('books');

    newBookForm.onsubmit = function() {
        addBookToLibrary();
        infoMsg.innerHTML = 'Book Added!';
        setTimeout(() => {infoMsg.innerHTML = '';}, 4000);
        return false;
    };

    function addBookToLibrary() {
        const newBook = new Book(
            titleInp.value,
            authorInp.value,
            parseInt(numPagesInp.value),
            readInp.checked
        );
        myLibrary.push(newBook);

        bookList.appendChild(createBookCard(myLibrary.length -1, newBook));
    }

    showFormBtn.addEventListener("click", () => {
        if (showFormBtn.value === 'open') {
            newBookForm.classList.add('formHidden');
            newBookForm.classList.remove('formVisible');
            showFormBtn.value = 'closed';
        } else {
            newBookForm.classList.add('formVisible');
            newBookForm.classList.remove('formHidden');
            showFormBtn.value = 'open';
        }

    });
}

function createBookCard(index, book) {
    const article = document.createElement("article");
    article.setAttribute("data-index", index);
    article.classList.add("bookCard");

    const lblSpans = [];
    for (let i = 0; i < 3; i++) {
        lblSpans.push(document.createElement("span"));
        lblSpans[i].classList.add("cardLbl");
    }
    lblSpans[0].innerText = "Title: ";
    lblSpans[1].innerText = "Author: ";
    lblSpans[2].innerText = "Number of Pages: ";
    const valSpans = [];
    for (let i = 0; i < 3; i++) {
        valSpans.push(document.createElement("span"));
        valSpans[i].classList.add("cardVal");
    }
    valSpans[0].innerText = book.title;
    valSpans[1].innerText = book.author;
    valSpans[2].innerText = book.numberOfPages;
    const label = document.createElement("label");
    label.classList.add("cardLbl");
    const checkId = `read${index}`;
    label.setAttribute("for", checkId);
    label.innerText = "Already read";

    const chkInp = document.createElement("input");
    chkInp.classList.add("cardBookRead");
    chkInp.setAttribute("type", "checkbox");
    chkInp.setAttribute("id", "checkId");
    chkInp.setAttribute("onclick", "isRead(this)");
    chkInp.checked = book.read;

    label.appendChild(chkInp);

    const btn = document.createElement("button");
    btn.classList.add("deleteBtn");
    btn.setAttribute("onclick", "deleteBook(this)");
    btn.setAttribute("type", "button");
    btn.innerText = "X";

    for (let i = 0; i < 3; i++) {
        article.appendChild(lblSpans[i]);
        article.appendChild(valSpans[i]);
    }
    article.appendChild(label);
    article.appendChild(btn);
    return article;
}

function deleteBook(ev) {
    const index = parseInt(ev.parentElement.dataset.index);
    const articles = bookList.getElementsByTagName('article');

    for (let i = 0; i < articles.length; i++) {
        if (index === i) {
            bookList.removeChild(articles[i]);
            resetBookNodesIndex(articles);
        }
    }
    myLibrary.splice(index);
}

function isRead(ev) {
    const article = ev.closest('article');
    const index = parseInt(article.dataset.index);

    myLibrary[index].isRead(ev.checked);
}

//if the user deletes entries, except the last,
//the index from the book loses the link to the array index
function resetBookNodesIndex(books) {
    for (let i = 0; i < books.length; i++) {
        books[i].setAttribute("data-index", i);
    }
}

