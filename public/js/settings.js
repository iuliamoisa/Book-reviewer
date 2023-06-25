//////////////// CHANGE DESCRIPTION
const form = document.getElementById('textForm');
form.addEventListener('submit', function(event) {
  event.preventDefault(); 
  const textInput = document.getElementById('textInput').value;
    if (textInput.length === 0) {
      alert('Please write a description!');
      return;
    }
    const data = {
      descriere:textInput
    };
    const token = localStorage.getItem('token');
    fetch('/updateDescription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        alert('Description updated successfully');
        form.reset();
      } else {
        throw new Error('Error updating description');
      }
    })
    .catch(error => {
      console.error('Error submitting review:', error);
    });
    document.getElementById('textInput').value = '';
});

//////////////////////////// CHOOSE AVATAR

window.addEventListener('load',fetchProfilePic);

function fetchProfilePic() {
  const token = localStorage.getItem('token');
  fetch('http://localhost:3000/getProfilePic', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(data.length);
       
        const imagine=document.getElementById('output');
        imagine.src=data.imagine;
      })
      .catch(error => {
        console.error('Error fetching friends:', error);
      });
  }
function redirect (){
  window.location.href='./avatars.html';
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