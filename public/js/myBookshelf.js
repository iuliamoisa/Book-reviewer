
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
      console.log("incercare: ",data[i]);
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

function parseHTML2(data){
  html = '';
  for (let i = 0; i < data.length ; i++) {
    console.log("incercare: ",data[i]);
  html += `<div class="bookMember">
              <p class="booksTitle" onclick="redirectToBook(${data[i].book_id})">${data[i].book_name}</p>
              <p class="booksAuthor" onclick="redirectToBook(${data[i].book_id})">${data[i].author}</p>
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
                  <button class="updateProgressBtn" onclick="updateProgress(${data[i].book_id}, ${data[i].total_pages},${data[i].current_page})">Update Progress</button>
              </div>`;
  }   
}

function redirectToBook(bookId){
  window.location.href = `/book?bookId=${bookId}`;
}
function fetchBookDetails(friendId) {
  const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/getBookDetails?idFriend=${friendId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
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
  const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/getCurrentlyReadingDetails?idFriend=${friendId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
      .then(data => {
        parseHTML2(data);
        const rightSide = document.getElementById("rightSide");
        rightSide.innerHTML = html;
      })
      .catch(error => {
        console.error('Error fetching recommendation:', error);
      });
  }

  function fetchToReadDetails(friendId) {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/getToReadDetails?idFriend=${friendId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
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
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/getReadDetails?idFriend=${friendId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
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
  function updateProgress(bookId, totalPages, currentPage) {
    const pagesRead = prompt(`You currently read ${currentPage} pages out of ${totalPages} pages. Enter the page you're currently at. `);
    if (pagesRead === null || pagesRead === '' || pagesRead <= 0 || pagesRead>totalPages) {
      return; 
    }
  
    const progress = Math.floor((pagesRead / totalPages) * 100);
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/updateProgress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ bookId, pagesRead, totalPages })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Request failed');
        }
        location.reload();
      })
      .catch(error => {
        console.error('Error updating progress:', error);
      });
  }
  