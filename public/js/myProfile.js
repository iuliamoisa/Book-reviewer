window.addEventListener('load',fetchProfileFriends);
window.addEventListener('load',fetchFriendsCount);
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
      liOfFriends.innerHTML=`Johhny's friends(${data})`;
      
     
    })
    .catch(error => {
      console.error('Error fetching request:', error);
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