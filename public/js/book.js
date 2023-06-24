////////////////////// AFISEAZA REVIEW URILE UNEI ANUMITE CARTI
function fetchCertainBookReviews() {
  return fetch('/certainBookReviews')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error fetching reviews for this book');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching reviews for this book:', error);
      // Handle the error gracefully
    });
}

fetchCertainBookReviews()
.then((reviews) => {
  displayCertainBookReviews(reviews);
})
.catch((error) => {
  console.error('Error fetching reviews for this book:', error);
});

function createHTMLReviewForBook(review) {
  let reviewHTML = '<div class="review">';
  reviewHTML += `<span class="review-author">${review.nume} ${review.prenume}  </span>`;
  
  if (review.rating) {
    reviewHTML += `<div class="rating-stars">`;
    for (let i = 0; i < review.rating; i++) {
      reviewHTML += '<span class="star">&#9733;</span>';
    }
    reviewHTML += `</div>`;
  }
  
  if (review.recenzie_text) {
    reviewHTML += `<p class="review">${review.recenzie_text}</p>`;
  }
  
  reviewHTML += `</div>`;
  
  return reviewHTML;
}


function displayCertainBookReviews(reviews) {
  const certainBookReviewsContainer = document.getElementById('reviews-container');

  certainBookReviewsContainer.innerHTML = '';
  if(reviews.length != 0){
    reviews.forEach((review) => {
      const reviewHTML = createHTMLReviewForBook(review);
      certainBookReviewsContainer.innerHTML += reviewHTML;
    });
  }
  else certainBookReviewsContainer.innerHTML =`<p id="no-reviews-message">This book has no reviews.</p>`;
  
}
////////////////////// ADAUGA RATING
const stars = document.querySelectorAll('.stars span');
const starsNone = document.querySelector('.rating-box');

// selectare stele ....
stars.forEach((star, index1) => {
  star.addEventListener('click', () => {
    stars.forEach((star, index2) => {
      // ---- ---- Active Star ---- ---- //
      index1 >= index2
        ? star.classList.add('active')
        : star.classList.remove('active');
    });
  });
});

const form = document.getElementById('review-form');
form.addEventListener('submit', function(event) {
  event.preventDefault(); 
  const rating = document.querySelectorAll('.stars span.active').length;
  const reviewText = document.getElementById('add-review').value.trim();
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get('bookId');
  if (rating === 0) {
    alert('Please select a rating');
    return;
  }
  const data = {
    book_id: bookId,
    rating: rating,
    reviewText: reviewText
  };
  fetch('/submit-review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      alert('Review submitted successfully');
      form.reset();
    } else {
      throw new Error('Error submitting review');
    }
  })
  .catch(error => {
    console.error('Error submitting review:', error);
  });
});

////////////////////////////// BUTON DE ADAUGA IN LISTA DE ''TO READ''

function addToReadingList2(){

  const button = document.getElementById('add-to-list-button');
  button.disabled = true; // Disable the button
  button.textContent = 'Added!'; // Change the button text
    console.log("BLA");
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId');
    addToReadingList(bookId);
  }
  function addToReadingList(bookId) {
    // Send a POST request to the server to add the book to the "to read" list
    fetch('http://localhost:3000/add-to-reading-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookId : bookId }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Book added to reading list');
        } else {
          console.error('Failed to add book to reading list');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  ////////////////////////////////////////////

  ////////////////////// DROPDOWN MENU

function openMulti() {
    if (document.querySelector(".selectWrapper").style.pointerEvents == "all") {
      document.querySelector(".selectWrapper").style.opacity = 0;
      document.querySelector(".selectWrapper").style.pointerEvents = "none";
      resetAllMenus();
    } else {
      document.querySelector(".selectWrapper").style.opacity = 1;
      document.querySelector(".selectWrapper").style.pointerEvents = "all";
    }
  }
  
  
  function resetAllMenus() {
    setTimeout(function () {
      var x = document.getElementsByClassName("multiSelect");
      var i;
      for (i = 1; i < x.length; i++) {
        x[i].style.transform = "translateX(100%)";
        x[i].style.clipPath = "polygon(0 0, 0 0, 0 100%, 0% 100%)";
      }
      document.querySelectorAll(".multiSelect")[0].style.transform =
        "translateX(0)";
      document.querySelectorAll(".multiSelect")[0].style.clipPath =
        "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
    }, 300);
  }

  /////////////////////// LOGOUT

function logout() {
    console.log("MERGE LOGOUT");
    fetch('http://localhost:3000/getFriendsCount', {
      method: 'GET',
      credentials: 'same-origin' // Include cookies in the request
    })
    .then((response) => {
      if (response.ok) {
        window.location.href = '/signIn.html';
      } else {
        // Handle the error
        console.error('Logout failed:', response.statusText);
      }
    })
    .catch((error) => {
      // Handle the error
      console.error('Logout failed:', error);
    });
  }

  function getGenreList() {
    // Send a GET request to the server to get the list of all book titles with the given genre and display it inside book-genre-response div
    bookGenre = document.getElementById('book-genre-button').textContent;
    console.log(bookGenre);
    fetch(`http://localhost:3000/get-genre-list?bookGenre=${bookGenre}`, {
      method: 'GET',
      credentials: 'same-origin' // Include cookies in the request
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        // Handle the error
        console.error('Get genre list failed:', response.statusText);
      }
    }
    )
    .then((data) => {
      // Display the list of books inside book-genre-response div
      const bookGenreResponse = document.getElementById('book-genre-response');
      bookGenreResponse.innerHTML = '';
      for(let i=0;i<data.length;i++){
        bookGenreResponse.innerHTML+="<p class='book-genre-element' onclick='redirectBook("+data[i].id+")'>"+data[i].titlu+"</p>";
      }
    })
  }

  function redirectBook(bookID) {
    window.location.href = `/book?bookId=${bookID}`;
  }
  

