
window.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const friendId = urlParams.get('idFriend');

  window.addEventListener("load",()=> { fetchBookDetails(friendId)});
  let allBooks = document.getElementById("allBooks");
  allBooks.addEventListener("click",()=> {fetchBookDetails(friendId)});

  let currentlyReading = document.getElementById("currentlyReading");
  currentlyReading.addEventListener("click",()=> {fetchCurrentlyReadingDetails(friendId)});

  let toRead = document.getElementById("toRead");
  toRead.addEventListener("click",()=> { fetchToReadDetails(friendId)});

  let alreadyRead = document.getElementById("alreadyRead");
  alreadyRead.addEventListener("click",()=> { fetchReadDetails(friendId)});
});


let html;

function parseHTML(data){
    html = '';
    for (let i = 0; i < data.length ; i++) {
      console.log("incercare: ",data[i].book_id);
    html += `<div class="bookMember" onclick="redirectToBook(${data[i].book_id})">
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

function redirectToBook(bookId){
  window.location.href = `/book?bookId=${bookId}`;
}
function fetchBookDetails(friendId) {
  console.log("winx puterea femeii", friendId);
    fetch(`http://localhost:3000/getBookDetails?idFriend=${friendId}`)
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

function fetchCurrentlyReadingDetails(friendId) {
  console.log("blaaaa", friendId);
    fetch(`http://localhost:3000/getCurrentlyReadingDetails?idFriend=${friendId}`)
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

  function fetchToReadDetails(friendId) {
    console.log("ahahahah", friendId);
    fetch(`http://localhost:3000/getToReadDetails?idFriend=${friendId}`)
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
  function fetchReadDetails(friendId) {
    console.log("blacewcdqdxnskqaaa", friendId);
    fetch(`http://localhost:3000/getReadDetails?idFriend=${friendId}`)
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