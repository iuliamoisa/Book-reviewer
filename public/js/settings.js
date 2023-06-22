//////////////////////////// CHOOSE AVATAR

var loadFile = function (event) {
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
  };

  
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