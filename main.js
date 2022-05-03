let library = [];

// Book Div and Template const
const temp = document.querySelector('.book');
const bookshelf = document.querySelector('#bookshelf');
bookshelf.style.display="grid";
bookshelf.style.gap="10px";
bookshelf.style.Height="75vh";
bookshelf.style["justify-content"] = "center";
bookshelf.style["padding"] = "2%";
// bookshelf.style["overflow"] = "hidden";


let idBook = library.length;

function Book(title, author, pages, ifread) {
  this.id = idBook;
  this.title = title;
  this.author = author;
  this.pages = pages; // number
  this.ifread = ifread; // boolean
  idBook += 1;
}

function ReloadLibrary() {
  library = JSON.parse(localStorage.library);

  bookshelf.innerHTML = '';

  for (let i = 0; i < library.length; i += 1) {
    // eslint-disable-next-line no-use-before-define
    DisplayBook(library[i]);
  }
}

function SaveBook(title, author, pages, ifread) {
  const book = new Book(title, author, pages, ifread);
  if (!Array.isArray(library)) {
    library = [];
  }
  library.push(book);

  console.log(book);

  localStorage.library = JSON.stringify(library);

  ReloadLibrary();
}

// eslint-disable-next-line no-unused-vars
function AddBook() {
  // eslint-disable-next-line no-restricted-globals
  event.preventDefault();

  const formAddBook = document.forms.AddBook;
  const bookData = new FormData(formAddBook);
  
  const bookTitle = bookData.get('title');
  const bookAuthor = bookData.get('author');
  const bookPages = bookData.get('pages');
  const bookRead = bookData.get('checkbookread');

  formAddBook.reset();


  SaveBook(bookTitle, bookAuthor,bookPages,bookRead);
}
/* eslint-enable no-unused-vars */

function DeleteBook(id) {
  library = library.filter((book) => book.id !== id);

  localStorage.library = JSON.stringify(library);

  ReloadLibrary();
}

// function toggleRead(id) {
//   library = JSON.parse(localStorage.library);

//   for (let i = 0; i < library.length; i += 1) {
//     console.log(library[i]);
//     // eslint-disable-next-line no-use-before-define
//     if(library[i].id===id) {
//       // console.log(library[i].ifread);
//       if(library[i].ifread==="on"){
//         library[i].ifread=null;
//       }
//       else{
//         library[i].ifread="on";
//       }
//       console.log(library[i].ifread);
//     }
//   }
// }


function DisplayBook(book) {
  var card = document.createElement("div");
  card.className = "card bg-light";
  card.style["box-shadow"] = "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px";

  var cardbody = document.createElement("div");
  cardbody.className = "card-body";

  var booktitle = document.createElement("h3");
  booktitle.className = "card-title";
  booktitle.innerText = "Title: "+book.title.toUpperCase();

  var bookauthor = document.createElement("h5");
  bookauthor.className = "card-subtitle text-muted";
  bookauthor.innerText = "Author: "+book.author.toUpperCase();

  var bookpages = document.createElement("h5");
  bookpages.className = "card-subtitle text-muted";
  bookpages.innerText = "No. of Pages: "+book.pages;
  bookpages.style.marginTop = "4px";

  var deletebtn = document.createElement("button");
  deletebtn.className = "btn btn-danger";
  deletebtn.innerText = "Remove Book";
  deletebtn.style.margin = "20px";
  card.appendChild(cardbody);

  // bookcheckboxdiv = document.createElement("div");
  // bookcheckboxdiv.style.border = "2px solid red";
  // bookcheckboxdiv.className = "book-ckeckbook";
  // bookcheckboxdiv.style.display = "flex";
  // bookcheckboxdiv.style.flexDirection = "row";
  // bookcheckboxdiv.style.justifyContent = "center";

  bookreadlabel = document.createElement("label");
  bookreadlabel.style.width = "fit-content";
  bookreadlabel.className = "card-subtitle text-muted";
  bookreadlabel.style.fontSize = "20px";
  bookreadlabel.for = "bookread";
  bookreadlabel.style.marginTop = "10px";
  bookreadlabel.innerText = "Have your read it?";

  bookreadinput = document.createElement("input");
  bookreadinput.className = "form-control";
  bookreadinput.type = "checkbox";
  bookreadinput.id = "bookread";
  // bookreadinput.style.display = "inline-block";
  // bookreadinput.style.width = "30px";
  // bookreadinput.style.height = "30px";
  bookreadinput.name = "bookread";
  
  // bookcheckboxdiv.appendChild(bookreadlabel);
  // bookcheckboxdiv.appendChild(bookreadinput);
  cardbody.appendChild(booktitle);
  cardbody.appendChild(document.createElement("hr"));
  cardbody.appendChild(bookauthor);
  cardbody.appendChild(bookpages);
  // cardbody.appendChild(bookcheckboxdiv);
  cardbody.appendChild(bookreadlabel);
  cardbody.appendChild(bookreadinput);
  cardbody.appendChild(deletebtn);
  card.querySelector('button').addEventListener('click', () => { DeleteBook(book.id); });

  if(book.ifread==="on"){
    bookreadinput.checked = true;
  }
  
  // bookreadinput.addEventListener('click', () => { toggleRead(book.id); });
  bookshelf.appendChild(card);
}

// Load the Library on opening the page
ReloadLibrary();
