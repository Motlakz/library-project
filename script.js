class Book {
    constructor(title, author, pages, read = false) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
      this.showInfo = function() {
        console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`);
      };
    }
  }
  
  let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
  
  function addBookToLibrary(title, author, pages, read) {
    // check if book already exists in library
    const existingBook = myLibrary.find(book => book.title === title && book.author === author);
    if (existingBook) {
      alert('Book already exists in library!');
      return;
    }
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    // store updated library data into localStorage
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  }
  
  const table = document.createElement('table');
  
  table.innerHTML = `
  <thead>
      <tr>
      <th>Title</th>
      <th>Author</th>
      <th>Pages</th>
      <th>Read</th>
      </tr>
  </thead>
  <tbody>
    ${myLibrary.map((book, index) => `
    <tr data-index="${index}">
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>
            <span>${book.read ? '' : ''}</span>
            <label class="switch">
                <input type="checkbox" ${book.read ? 'checked' : ''} onchange="updateReadStatus(${index})">
                <span class="slider round"></span>
            </label>
        </td>
        <td>
            <button class="remove" onclick="removeBook(${index})">Remove</button>
        </td>
      </tr>
      `).join('')}
  </tbody>

  <button type="button">Add New Book</button>
  `;
  
  document.body.appendChild(table);

  function updateReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  }

  const addBookBtn = document.querySelector('button[type=button]');
  const newBookForm = document.getElementById('new-book-form');
  const cancelBtn = document.querySelector('.cancel');
  const submitBtn = document.querySelector('button[type=submit]');
  
  addBookBtn.addEventListener('click', () => {
    newBookForm.style.display = "block";
  });
  
  cancelBtn.addEventListener('click', () => {
    newBookForm.style.display = "none";
  });
  
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
  
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;
  
    addBookToLibrary(title, author, pages, read);
    updateTable();
    newBookForm.style.display = "none"; 

    ['title', 'author', 'pages', 'read'].forEach(field => {
      document.querySelector(`#${field}`).value = field === 'read' ? false : '';
    });
 
  });
  
  function removeBook(index) {
    myLibrary.splice(index, 1);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    updateTable();
  }

  function updateTable() {
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';
    tbody.innerHTML = `
      ${myLibrary.map((book, index) => `
      <tr data-index="${index}">
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.pages}</td>
          <td>
              <span>${book.read ? '' : ''}</span>
              <label class="switch">
                  <input type="checkbox" ${book.read ? 'checked' : ''} onchange="updateReadStatus(${index})">
                  <span class="slider round"></span>
              </label>
          </td>
          <td>
              <button class="remove" onclick="removeBook(${index})">Remove</button>
          </td>
      </tr>
      `).join('')}
    `;
  }
  