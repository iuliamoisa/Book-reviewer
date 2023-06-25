function redirect2(){
  const urlParams = new URLSearchParams(window.location.search);
  const friendId = urlParams.get('idFriend');
  redirectToBookshelf(friendId);
}

window.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const friendId = urlParams.get('idFriend');
  fetchProfileFriends(friendId);
  fetchProfileData(friendId);
 
  fetchFriendsCount(friendId);
  fetchProfilePic(friendId);
});

function fetchProfilePic(friendId) {
  const token = localStorage.getItem('token');
  fetch(`http://localhost:3000/getProfilePic?idFriend=${friendId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(response => response.json())
      .then(data => {
        console.log(data);
        const imagine=document.getElementById('profilePic');
        imagine.src=data.imagine;
      })
      .catch(error => {
        console.error('Error fetching friends:', error);
      });
  }

function fetchProfileData(friendId) {
  const token = localStorage.getItem('token');
  fetch(`http://localhost:3000/getProfileData?idFriend=${friendId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(response => response.json())
    .then(data => {
      console.log(data);
      const userNameElement = document.getElementById("userName");
      const nrOfBooksElement = document.getElementById("nrOfBooks");
      const nrOfReadingBooksElement = document.getElementById("readingBooks");
      const nrOfToReadBooksElement = document.getElementById("toReadBooks");
      const descriptionElement = document.getElementById("description");
      userNameElement.textContent = data.name;
      nrOfBooksElement.textContent = data.booksCount;
      nrOfReadingBooksElement.textContent = data.readingBooksCount;
      nrOfToReadBooksElement.textContent = data.toReadBooksCount;
      
      if(data.descriere == null) 
        descriptionElement.textContent ="No description added.";
      else descriptionElement.textContent = data.descriere;
      console.log("CEVAaaaa " + data.descriere);
    })
    .catch(error => {
      console.error('Error fetching profile data:', error);
    });
}


function fetchProfileFriends(friendId){
  const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/getProfileFriends?idFriend=${friendId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const liOfFriends=document.getElementById("listOfFriends");
      liOfFriends.innerHTML='';
      for(let i=0;i<data.length;i++){
        liOfFriends.innerHTML+=`<div class="personFriend">
                        <img src="${data[i].friend_image}" id="f1" class="friendPicture"></img>
                        <p id="nameFriends"><span class="nameForFriend" onclick="redirectPage(${data[i].friend_id})">${data[i].friend_name} </span><br> ${data[i].book_count} books | ${data[i].friend_count} friends</p>
                      </div>`;
      }
    })
    .catch(error => {
      console.error('Error fetching request:', error);
    });
}
function fetchFriendsCount(friendId){
  const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/getFriendsCount?idFriend=${friendId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const liOfFriends=document.getElementById("friendsTitle");
      liOfFriends.innerHTML='';
      liOfFriends.innerHTML=`Friends(${data})`;
    })
    .catch(error => {
      console.error('Error fetching request:', error);
    });
}
function redirectPage(idFriend){
  window.location.href = `/myProfile.html?idFriend=${idFriend}`;
}

function redirectToBookshelf(idFriend){
  window.location.href = `/myBookshelf.html?idFriend=${idFriend}`;
}
/////////////////////// LOGOUT

function logout() {
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