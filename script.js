let myLibrary = [];
const library = document.querySelector('.library');

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        return this.title + " by " + this.author + ", " + this.pages + " pages, ";
    }
}

document.getElementById('save-btn').addEventListener('click', e => {
    addBook(e);
});

function addBook(e){
    e.preventDefault();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.querySelector('input[name="read-status"]:checked').value;

    myLibrary.push(new Book(title, author, pages, read));
    displayLibrary();
    document.querySelector('form').reset();
} 

function displayLibrary(){
    library.innerHTML = '';

    let i = 0;
    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.className = "card";

        let bookTitle = document.createElement('h1');
        bookTitle.textContent = book.title;

        let bookDetails = document.createElement('p');
        bookDetails.setAttribute('style', 'white-space: pre;');
        bookDetails.textContent = "By " + book.author + "\r\n";
        bookDetails.textContent += "# of Pages: " + book.pages;

        let readBtn = document.createElement('button');
        readBtn.id = "read-btn";
        readBtn.textContent = "Read - " + book.read;
        readBtn.dataset.index = i;

        let removeBtn = document.createElement('button');
        removeBtn.textContent = "X";
        removeBtn.id = "remove-btn";
        removeBtn.dataset.index = i;
        i++;

        card.appendChild(removeBtn);
        card.appendChild(bookTitle);
        card.appendChild(readBtn)
        card.appendChild(bookDetails)
        library.appendChild(card);

        removeBtn.addEventListener('click', () => {
            removeBook(removeBtn.dataset.index, card)
        });
        readBtn.addEventListener('click', () =>{
            changeReadStatus(readBtn.dataset.index, readBtn);
        });
    });
}

function removeBook(index, card){
    myLibrary.splice(index, 1);
    card.remove();
    displayLibrary();
}

function changeReadStatus(index, readBtn){
    if(myLibrary[index].read === "Yes"){
        myLibrary[index].read = "No";
        readBtn.textContent = "Read - No";
    }
    else if (myLibrary[index].read === "No"){
        myLibrary[index].read = "Yes";
        readBtn.textContent = "Read - Yes";
    }
}


document.getElementById('clear-btn').addEventListener('click', () =>{
    myLibrary = [];
    library.innerHTML = '';
});

document.getElementById('add-btn').addEventListener('click', ()=> {
    document.getElementById('popup-form').style.display = "flex";
});

document.getElementById('close-btn').addEventListener('click', () => { 
    document.getElementById('popup-form').style.display = "none";
});







