
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
    fetch('http://localhost:3000/recommendation')
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
  //window.addEventListener('load', fetchRecommendation);

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

showFeedPosts();



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



/////////////////// FRIENDS PAGE 
// function showAllFriends() {
//   const profilesContent = document.getElementById('profiles-content');
//   profilesContent.innerHTML = `
//   <div class="profile-card">
//   <img src="pictures/doctor.jpeg" alt="Profile Picture">
//   <h4>John</h4>
// </div>
// <div class="profile-card">
//   <img src="pictures/plumber.jpeg" alt="Profile Picture">
//   <h4>Johnny</h4>
// </div>
//   `;
// }


// function showFriendRequests() {
//   const profilesContent = document.getElementById('profiles-content');
//   profilesContent.innerHTML = `
//       <div class="profile-card">
//           <img src="friend-request-pic1.jpg" alt="Profile Picture">
//           <h4>Friend Request 1</h4>
//           <button class="accept-button">Accept</button>
//           <button class="decline-button">Decline</button>
//       </div>
//       <div class="profile-card">
//           <img src="friend-request-pic2.jpg" alt="Profile Picture">
//           <h4>Friend Request 2</h4>
//           <button class="accept-button">Accept</button>
//           <button class="decline-button">Decline</button>
//       </div>
//   `;
// }

// function showFriendSuggestions() {
//   const profilesContent = document.getElementById('profiles-content');
//   profilesContent.innerHTML = `
//       <div class="profile-card">
//           <img src="friend-suggestion-pic1.jpg" alt="Profile Picture">
//           <h4>Friend Suggestion 1</h4>
//           <button class="add-button">Add Friend</button>
//       </div>
//       <div class="profile-card">
//           <img src="friend-suggestion-pic2.jpg" alt="Profile Picture">
//           <h4>Friend Suggestion 2</h4>
//           <button class="add-button">Add Friend</button>
//       </div>
//   `;
// }
// Function to change the active menu and update the content


// window.addEventListener('DOMContentLoaded', function() {
//   const myFriendsOption = document.querySelector('.navbar-sect');
//   changeMenu('my-friends'); // Call the changeMenu function to display the content for "My Friends" option
  
//   // Remove the 'active' class from all menus
//   const menus = document.getElementsByClassName('navbar-sect');
//   for (let i = 0; i < menus.length; i++) {
//     menus[i].classList.remove('active');
//   }
  
//   // Add the 'active' class to the "My Friends" option
//   myFriendsOption.classList.add('active');
// });

window.addEventListener('load', fetchFriendsList);
window.addEventListener('load',fetchGroupsList);


  function fetchFriendsList() {
    fetch('http://localhost:3000/getFriends')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(data.length);
        console.log(data[0].username);
        const friendsList=document.getElementById('friendsList');
        friendsList.innerHTML='';
        for(let i=0;i<data.length;i++){
          friendsList.innerHTML+=`<p class="a-friend">${data[i].username}</p>`
        }
        showFriends();
      })
      .catch(error => {
        console.error('Error fetching friends:', error);
      });
  }


  function fetchGroupsList() {
  
    fetch('http://localhost:3000/getGroups')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(data.length);
        //console.log(data[0].username);
        const groupsList=document.getElementById('groupsList');
        groupsList.innerHTML='';
        for(let i=0;i<data.length;i++){
          groupsList.innerHTML+=`<p>${data[i].group_name}</p>`
        }
        
       // document.getElementById('friend-name').textContent = data.friend_name;
        //document.getElementById('book-title').textContent = data.book_title;
        //document.getElementById('book-description').textContent = data.book_description;
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
        // Handle the error gracefully
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
    
    // Generate HTML for each review and append it to the container
    reviews.forEach((review) => {
      const reviewHTML = createReviewHTML(review);
      feedPostsContainer.innerHTML += reviewHTML;
    });
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