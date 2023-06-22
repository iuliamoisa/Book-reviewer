const friendsButton=document.getElementById('getMyFriends');
  console.log(friendsButton);
const requestsButton=document.getElementById('getMyReq');
const suggestionButton =document.getElementById('getMySugg');
requestsButton.addEventListener('click',fetchRequests);
friendsButton.addEventListener('click',fetchFriends);
suggestionButton.addEventListener('click',fetchSuggestion);

function changeMenu(menu,data) {
    const menus = document.getElementsByClassName('navbar-sect');
    const content = document.getElementById('profiles-content');
  console.log("123");
    content.innerHTML='';
  
    console.log(menu);
    if(data.string=='notOk'){
      content.innerHTML += `
            <div class="profile-card">
                
                <h4>There is nothing to show yet!</h4>
            </div>`
            
            ;
            return;
    }
    switch (menu) {
        
      case 'my-friends':
        for( let i =0;i<data.length;i++){
            console.log(data[i].username);
            content.innerHTML += `
            <div class="profile-card">
                <img src="pictures/doctor.jpeg" alt="Profile Picture">
                <h4>${data[i].username}</h4>
            </div>`
            
            ;
        }
            
        break;
      case 'friend-requests':
        for(let i=0;i<data.length;i++){
            content.innerHTML += `
          <div class="profile-card">
            <img src="pictures/friend1.jpeg" alt="Profile Picture">
            <h4>You have a friend request from ${data[i].username}</h4>
            <button class="accept-button" onclick=addRemove(1,${data[i].id})>Accept</button>
            <button class="decline-button" onclick=addRemove(-1,${data[i].id})>Decline</button>
          </div>`;
        }
        if(data.length==0)
        content.innerHTML = `
        <div class="profile-card">
          
          <h4>There are no friend requests yet!</h4>
         
        </div>`;
        
          
        break;
      case 'friend-suggestions':
        for(let i=0;i<data.length;i++){
            content.innerHTML += `
            <div class="profile-card">
                <img src="pictures/friend3.jpeg" alt="Profile Picture">
                <h4>${data[i].username} has ${data[i].common_books_count} books in common with you, and also seems to be a member of ${data[i].group_name}</h4>
                <button class="add-button" onclick=addFriendFromSugg(${data[i].idp})>Add Friend</button>
            </div>`;
        }
        break;
      default:
        break;
    }
  }

  function addFriendFromSugg(idp){
    fetch(`http://localhost:3000/addFriendFromSugg`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ idFriend: idp }),
})
  .then(response =>response.json())
  .then(updatedData => {
    console.log("!!!"+updatedData);
    console.log('Update successful');
    
    if(updatedData=='ok'){
      window.alert('Friend request sent with succes!');
      location.reload();
    }
  })
  .catch(error => {
    console.error('Error updating row:', error);
  });
  }


function addRemove(decision, idP){
  decision=Number(decision);
  if(decision==1){
    console.log("toADD");
    console.log(idP);
    toAddFriend(idP);
  }
  if(decision==-1){
    console.log("toREMOVE");
    console.log(idP);
    toRemoveFriend(idP);
  }
}  



function toRemoveFriend(idP){
  fetch(`http://localhost:3000/refuseFriend`, {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ idFriend: idP }),
})
  .then(response =>response.json())
  .then(updatedData => {
    console.log("!!!"+updatedData);
    console.log('Update successful');
    
    if(updatedData=='ok'){
      window.alert('Friend request refused!');
      location.reload();
    }
  })
  .catch(error => {
    console.error('Error updating row:', error);
  });
}


function toAddFriend(idP){
  fetch(`http://localhost:3000/acceptFriend`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ idFriend: idP }),
})
  .then(response =>response.json())
  .then(updatedData => {
    console.log("!!!"+updatedData);
    console.log('Update successful');
    
    if(updatedData=='ok'){
      window.alert('Friend request accepted!');
      location.reload();
    }
  })
  .catch(error => {
    console.error('Error updating row:', error);
  });
}



function fetchRequests() {
  
  fetch('http://localhost:3000/getRequests')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      //console.log(data.length);
      //console.log(data[0].username);
      changeMenu('friend-requests',data);
      
     // document.getElementById('friend-name').textContent = data.friend_name;
      //document.getElementById('book-title').textContent = data.book_title;
      //document.getElementById('book-description').textContent = data.book_description;
    })
    .catch(error => {
      console.error('Error fetching request:', error);
    });
}
function fetchFriends() {
  
    fetch('http://localhost:3000/getFriends')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(data.length);
        //console.log(data[0].username);
        console.log(data.string);
        changeMenu('my-friends',data);
        
       // document.getElementById('friend-name').textContent = data.friend_name;
        //document.getElementById('book-title').textContent = data.book_title;
        //document.getElementById('book-description').textContent = data.book_description;
      })
      .catch(error => {
        console.error('Error fetching friends:', error);
      });
  }

  function fetchSuggestion() {
  
    fetch('http://localhost:3000/getFriendSuggestions')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        //console.log(data.length);
        //console.log(data[0].username);
        changeMenu('friend-suggestions',data);
        
       // document.getElementById('friend-name').textContent = data.friend_name;
        //document.getElementById('book-title').textContent = data.book_title;
        //document.getElementById('book-description').textContent = data.book_description;
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
