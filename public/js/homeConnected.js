const quotes = [
    "The purpose of literature is to turn blood into ink. \n(T.S. Eliot)",
    "We read to know we're not alone. \n(William Nicholson)",
    "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers. \n(Charles W. Eliot)",
    "A great book should leave you with many experiences, and slightly exhausted at the end. You live several lives while reading. \n(William Styron)",
    "There is no friend as loyal as a book. \n(Ernest Hemingway)",
    "I cannot live without books. \n(Thomas Jefferson)",
    "Books are a uniquely portable magic. \n(Stephen King)",
    "A reader lives a thousand lives before he dies, said Jojen. The man who never reads lives only one. \n(George R.R. Martin)",
    "Once you have read a book you care about, some part of it is always with you. \n(Louis L'Amour)",
    "Reading is a basic tool in the living of a good life. \n(Mortimer J. Adler)"
  ];

const quoteElement = document.getElementById("quote");
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
quoteElement.textContent = randomQuote;
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

///////////////// RANDOM RECOMMENDATIONS BASED ON FRIENDS INTERESTS

let bookTitle,friendName,bookDesc,bookIdGlobal;

  function fetchRecommendation() { 
    const token = localStorage.getItem('token');
  fetch('http://localhost:3000/recommendation', {
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
        const rec=document.getElementById('recText');
        console.log(data);
        if(bookTitle==data.book_title && friendName==data.friend_name&& bookDesc==data.book_description)
          fetchRecommendation();
        else{
          rec.innerHTML = `You should try ${data.book_title}, your friend ${data.friend_name} has it in their bookshelf.<br><br> <span class="bookRec-description">Here is a quick description: <i> ${data.book_description}</i></span>`;
          bookIdGlobal=data.book_id;
          bookTitle=data.book_title;
          friendName=data.friend_name;
          bookDesc=data.book_description;
         // window.location.href = `/book?bookId=${data.book_id}`;
        }
      })
      .catch(error => {
        console.error('Error fetching recommendation:', error);
      });
  }
  function afiseazaCarte(){
    window.location.href = `/book?bookId=${bookIdGlobal}`;
  }

  const button = document.getElementById('book-button');
  const button2 = document.getElementById('see-book-button');
  button.addEventListener('click', fetchRecommendation);
  button2.addEventListener('click', afiseazaCarte);
////////////////////// LIMIT THE FEED POSTS

const feedPostsContainer = document.getElementById('feed-posts-container');
const viewMoreBtn = document.getElementById('view-more-btn');

const maxPostsToShow = 6;
viewMoreBtn.style.display = 'none';

function showFeedPosts() {
  const feedPosts = feedPostsContainer.getElementsByClassName('post');
  for (let i = 0; i < feedPosts.length; i++) {
    console.log("??????",maxPostsToShow);
    if (i < maxPostsToShow) {
      feedPosts[i].style.display = 'block';
      
    } else {
      feedPosts[i].style.display = 'none';
    }
  }
  if (feedPosts.length > maxPostsToShow) {
    viewMoreBtn.style.display = 'block';
  } else {
    viewMoreBtn.style.display = 'none';
  }
}

viewMoreBtn.addEventListener('click', function() {
  const feedPosts = feedPostsContainer.getElementsByClassName('post');
  for (let i = 0; i < feedPosts.length; i++) {
    feedPosts[i].style.display = 'block';
  }
  
  viewMoreBtn.style.display = 'none';
});

////////////////////// LIMIT THE FRIENDS SHOWN 


const friendsContainer = document.getElementById('friends-container');
const viewMoreBtn2 = document.getElementById('view-more-btn2');

const maxFriendsToShow = 5;

viewMoreBtn2.style.display = 'none';

function showFriends() {
  const friends = friendsContainer.getElementsByClassName('a-friend');
  console.log(friends);
  for (let i = 0; i < friends.length; i++) {
    if (i < maxFriendsToShow) {
      friends[i].style.display = 'block';
    } else {
      friends[i].style.display = 'none';
    }
  }
  
  if (friends.length > maxFriendsToShow) {
    viewMoreBtn2.style.display = 'block';
    console.log(viewMoreBtn2);
  } else {
    viewMoreBtn2.style.display = 'none';
  }
}

viewMoreBtn2.addEventListener('click', function() {
  const friend = document.getElementsByClassName('a-friend');
  console.log("AICI" + friend);
  for (let i = 0; i < friend.length; i++) {
    friend[i].style.display = 'block';
  }
  
  viewMoreBtn2.style.display = 'none';
});

window.addEventListener('load', fetchFriendsList);
window.addEventListener('load',fetchGroupsList);


function fetchFriendsList() {
  const token = localStorage.getItem('token');

  fetch('http://localhost:3000/getFriends', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(data.length);
      console.log(data[0].username);
      const friendsList = document.getElementById('friendsList');
      friendsList.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
        friendsList.innerHTML += `<p class="a-friend">${data[i].username}</p>`;
      }
      showFriends();
    })
    .catch(error => {
      console.error('Error fetching friends:', error);
    });
}
  function fetchGroupsList() {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/getGroups', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(data.length);
        const groupsList=document.getElementById('groupsList');
        groupsList.innerHTML='';
        for(let i=0;i<data.length;i++){
          groupsList.innerHTML+=`<p>${data[i].group_name}</p>`
        }
  
      })
      .catch(error => {
        console.error('Error fetching friends:', error);
      });
  }

  //// AFISARE REVIEWS PE FEED

  function fetchReviews() {
    return fetch('/reviews')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching reviews');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }

  fetchReviews()
  .then((reviews) => {
    displayReviews(reviews);
  })
  .catch((error) => {
    console.error('Error fetching reviews:', error);
  });

  function createReviewHTML(review) {
    let reviewHTML = '<div class="post">';
    reviewHTML += `<span class="user-name">${review.nume} ${review.prenume}  </span>`;
    reviewHTML += '<span class="activity"> added a new review </span>';
    reviewHTML += `<span class="timestamp">${review.review_timestamp}</span>`; 
    reviewHTML += `<p class="book-name">${review.titlu}</p>`;
    
    if (review.rating) {
      reviewHTML += `<div class="rating-stars">`;
      for (let i = 0; i < review.rating; i++) {
        reviewHTML += '<span class="star">&#9733;</span>';
      }
      reviewHTML += `</div>`;
    }
    
    if (review.recenzie_text) {
      reviewHTML += `<p class="review">${review.recenzie_text}</p>`;
      reviewHTML += `<div class="book-info2" id="book-text">`;
      reviewHTML += `<img class="book-cover" src="https://via.placeholder.com/150x200?text=${encodeURIComponent(review.titlu)}" alt="Book Cover">`;
      reviewHTML += `<div class="book-details2">`;
      reviewHTML += `<p class="author-name">Author: ${review.autor}</p>`;
      reviewHTML += `<p class="book-description2">Short description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>`;
      reviewHTML += `</div>`;
      reviewHTML += `</div>`;
    }
    
    reviewHTML += `</div>`;
    
    return reviewHTML;
  }
  

  function displayReviews(reviews) {
    const feedPostsContainer = document.getElementById('feed-posts-container');
    feedPostsContainer.innerHTML = '';
    reviews.forEach((review) => {
      const reviewHTML = createReviewHTML(review);
      feedPostsContainer.innerHTML += reviewHTML;
      
    });
    showFeedPosts();
  }

  /////////////////////// LOGOUT

function logout() {
  console.log("MERGE LOGOUT");
  fetch('http://localhost:3000/logout', {
    method: 'GET',
    credentials: 'same-origin' 
  })
  .then((response) => {
    if (response.ok) {
      window.location.href = '/signIn.html';
    } else {

      console.error('Logout failed:', response.statusText);
    }
  })
  .catch((error) => {
    console.error('Logout failed:', error);
  });
}

///////////////////////////////////// SEARCHBAR

function performSearch(){
  const searchResultsContainer = document.getElementById('search-results');
  const searchInput = document.getElementById('search-bar');
  const keyword = searchInput.value;
  console.log(keyword);

  if(keyword.length==0){
    searchResultsContainer.innerHTML='';
    return;
  }

  fetch(`http://localhost:3000/getByKeyword?keyword=${keyword}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(data.length);
      console.log(data[0].titlu);
      console.log(data[0].id);
      searchResultsContainer.innerHTML='';
      for(let i=0;i<data.length;i++){
        searchResultsContainer.innerHTML+=`<p id="search-results-element" class="home-header__search-results--element" onclick="assignValue(${data[i].id})">${data[i].titlu}</p>`
      }

    })
    .catch(error => {
      console.error('Error fetching Keyword', error);
    });
}

function assignValue(bookID) {
  const searchResultsContainerElement = document.getElementById('search-results-element');
  const searchResultsContainer = document.getElementById('search-results');
  const searchInput = document.getElementById('search-bar');
  searchInput.value=searchResultsContainerElement.textContent;
  searchResultsContainer.innerHTML='';

  window.location.href = `/book?bookId=${bookID}`;
}