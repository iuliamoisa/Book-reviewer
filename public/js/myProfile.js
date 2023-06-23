window.addEventListener('load',fetchProfileFriends);
window.addEventListener('load',fetchFriendsCount);
window.addEventListener('load', fetchProfileData);
window.addEventListener('load',fetchProfilePic);

function fetchProfilePic() {
  console.log("111111111");
    fetch('http://localhost:3000/getProfilePic')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(data.length);
       
        const imagine=document.getElementById('profilePic');
        imagine.src=data.imagine;
      })
      .catch(error => {
        console.error('Error fetching friends:', error);
      });
  }

function fetchProfileData() {
  fetch('http://localhost:3000/getProfileData')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const userNameElement = document.getElementById("userName");
      const nrOfBooksElement = document.getElementById("nrOfBooks");
      const nrOfReadingBooksElement = document.getElementById("readingBooks");
      const nrOfToReadBooksElement = document.getElementById("toReadBooks");
      userNameElement.textContent = data.name;
      nrOfBooksElement.textContent = data.booksCount;
      nrOfReadingBooksElement.textContent = data.readingBooksCount;
      nrOfToReadBooksElement.textContent = data.toReadBooksCount;
      console.log("CEVAaaaa " + data.booksCount);
      console.log("ALtcevaAaaaa " + data.toReadBooksCount);
       //const profilePicElement = document.getElementById("profilePic");
      //const readBooksElement = document.getElementById("readBooks");
      // profilePicElement.innerHTML = `<img src="${data.profilePicUrl}" alt="Profile Picture">`;
      // readBooksElement.textContent = `Read Books: ${data.readBooksCount}`;
    })
    .catch(error => {
      console.error('Error fetching profile data:', error);
    });
}


function fetchProfileFriends(){
    fetch('http://localhost:3000/getProfileFriends')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const liOfFriends=document.getElementById("listOfFriends");
      liOfFriends.innerHTML='';
      for(let i=0;i<data.length;i++){
        liOfFriends.innerHTML+=`<div class="personFriend">
                        <p id="f1" class="friendPicture"></p>
                        <p id="nameFriends"><span class="nameForFriend">${data[i].friend_name} </span><br> ${data[i].book_count} books | ${data[i].friend_count} friends</p>
                      </div>`;
      }
      
     
    })
    .catch(error => {
      console.error('Error fetching request:', error);
    });
}

function fetchFriendsCount(){
    fetch('http://localhost:3000/getFriendsCount')
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