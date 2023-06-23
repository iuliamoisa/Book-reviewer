//////////////// CHANGE DESCRIPTION
const form = document.getElementById('textForm');
form.addEventListener('submit', function(event) {
  event.preventDefault(); 
  const textInput = document.getElementById('textInput').value;
      console.log("aiciiiiiii: ", textInput);
    if (textInput.length === 0) {
      alert('Please write a description!');
      return;
    }
    const data = {
      descriere:textInput
    };
    fetch('/updateDescription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
  console.log("111111111");
    fetch('http://localhost:3000/getProfilePic')
      .then(response => response.json())
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



function checkImage() {
  fetch('http://localhost:3000/getImage')
    .then((response) => response.json())
    .then((data) => {
      // Create an <img> element and set the src attribute
      console.log(data);
      const imgElement = document.createElement('img');
      console.log(data.imageData); // Check the imageData property
      console.log(data.imageData.image_data); // Check the image_data property
      const imageDataArray = data.imageData.image_data.data;
      const uint8Array = new Uint8Array(imageDataArray);
      const binaryString = uint8Array.reduce(
        (accumulator, value) => accumulator + String.fromCharCode(value),
        ''
      );
      const base64String = btoa(binaryString);
      console.log(base64String); // Check the base64String
      imgElement.src = 'data:image/jpeg;base64,' + base64String;

      // Append the <img> element to a container on the webpage
      const container = document.getElementById('bla');
      container.innerHTML=`<img src=data:image/jpeg;base64,${base64String} width="200" height="200">`
      //container.appendChild(imgElement);
      console.log(imgElement);
    })
    .catch((error) => {
      console.error(error); // Handle error
    });
}







// const fileInput = document.getElementById('output');
// fileInput.addEventListener('change', () => {
//   const file = fileInput.files[0];
//   const formData = new FormData();
//   formData.append('image', file);

//   fetch('http://localhost:3000/upload', {
//     method: 'POST',
//     body: formData,
//   })
//     .then((response) => response.text())
//     .then((result) => {
//       console.log(result); // Display success message
//     })
//     .catch((error) => {
//       console.error(error); // Handle error
//     });
// });
  
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