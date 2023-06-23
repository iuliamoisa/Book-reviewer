window.addEventListener("load", fetchBookDetails);
let allBooks = document.getElementById("allBooks");
allBooks.addEventListener("click", fetchBookDetails);

let currentlyReading = document.getElementById("currentlyReading");
currentlyReading.addEventListener("click", fetchCurrentlyReadingDetails);

let toRead = document.getElementById("toRead");
toRead.addEventListener("click", fetchToReadDetails);

let alreadyRead = document.getElementById("alreadyRead");
alreadyRead.addEventListener("click", fetchReadDetails);
let html;
function parseHTML(data){
    html = '';
    for (let i = 0; i < data.length ; i++) {
    html += `<div class="bookMember">
                <p class="booksTitle">${data[i].book_name}</p>
                <p class="booksAuthor">${data[i].author}</p>
                <div>`;
    for (let j = 1; j < 6; j++) {
        if (j <= data[i].rating) {
        html += `<span class="fa fa-star checked"></span>`;
        } else {
        html += `<span class="fa fa-star"></span>`;
        }
    }
    html += `</div>
                <div class="borderProgress">
                    <div class="borderGrey">${data[i].progress}%</div>
                </div>
                </div>`;
    }   
}

function fetchBookDetails() {
    fetch('http://localhost:3000/getBookDetails')
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
      .then(data => {
        parseHTML(data);
        const rightSide = document.getElementById("rightSide");
        rightSide.innerHTML = html;
      })
      .catch(error => {
        console.error('Error fetching recommendation:', error);
      });
  }

  function fetchCurrentlyReadingDetails() {
    fetch('http://localhost:3000/getCurrentlyReadingDetails')
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
      .then(data => {
        parseHTML(data);
        const rightSide = document.getElementById("rightSide");
        rightSide.innerHTML = html;
      })
      .catch(error => {
        console.error('Error fetching recommendation:', error);
      });
  }

  function fetchToReadDetails() {
    fetch('http://localhost:3000/getToReadDetails')
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
      .then(data => {
        parseHTML(data);
        const rightSide = document.getElementById("rightSide");
        rightSide.innerHTML = html;
      })
      .catch(error => {
        console.error('Error fetching recommendation:', error);
      });
  }
  function fetchReadDetails() {
    fetch('http://localhost:3000/getReadDetails')
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
      .then(data => {
        parseHTML(data);
        const rightSide = document.getElementById("rightSide");
        rightSide.innerHTML = html;
      })
      .catch(error => {
        console.error('Error fetching recommendation:', error);
      });
  }