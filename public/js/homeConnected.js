
const books = [
    {
      title: "Harry Potter",
      description: "It's really great, we think you will love it.",
      image: "https://via.placeholder.com/150x200?text=Harry+Potter",
      link: "https://www.example.com/harry-potter",
    },
    {
      title: "The Great Gatsby",
      description: "A classic novel that you won't be able to put down.",
      image: "https://via.placeholder.com/150x200?text=The+Great+Gasby",
      link: "https://www.example.com/the-great-gatsby",
    },
    {
        title: "The Hunger Games",
        author: "Suzanne Collins",
        image: "https://via.placeholder.com/150x200?text=The+Hunger+Games",
        description:
          "It's really great, we think you will love it.",
        link: "https://www.example.com/the-hunger-games"
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        image: "https://via.placeholder.com/150x200?text=To+Kill+a+Mockingbird",
        description:
          "It's really great, we think you will love it.",
        link: "https://www.example.com/to-kill-a-mockingbird"
      }
  ];


const randomBook = books[Math.floor(Math.random() * books.length)];
//document.getElementById("book-image").src = randomBook.image;
document.getElementById("book-text").textContent =`Have you tried the book ${randomBook.title}? ${randomBook.description}`;

// DE AICI MODIFIC!!!!!!!!!!!!!!!!!!!!!!!!!! 
const bookButton = document.getElementById('book-button');
bookButton.addEventListener('click', () => {
  const bookId = Math.floor(Math.random() * books.length) + 1;
  window.location.href = `/book?bookId=${bookId}`;
});

function addToReadingList2(){
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

///////////////
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content 
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  }
*/

//////////////////// PT PAGINA SPEICIFCA UNEI CARTI

// function redirectToBookPage() {
//   // Get the book information from the "connected page"
//   const bookTitle = document.getElementById("book-title").textContent;
//   const bookCover = document.getElementById("book-image").src;
//   const bookDescription = document.getElementById("book-description").textContent;
//   const bookAuthor = document.getElementById("book-author").textContent;

//   // Encode the book information into the URL
//   const queryParams = new URLSearchParams({
//     title: bookTitle,
//     cover: bookCover,
//     description: bookDescription,
//     author: bookAuthor
//   });

//   // Redirect the user to the "book page" with the book information in the URL
//  // window.location.href = "book.html?" + queryParams.toString();
//  window.location.href = "book.html";
// }

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

let bookTitle,friendName,bookDesc;

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

          bookTitle=data.book_title;
          friendName=data.friend_name;
          bookDesc=data.book_description;
        }
      })
      .catch(error => {
        console.error('Error fetching recommendation:', error);
      });
  }

  window.addEventListener('load', fetchRecommendation);

  const button = document.getElementById('book-button');
  button.addEventListener('click', fetchRecommendation);

  


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