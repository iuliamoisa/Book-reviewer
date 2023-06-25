const friendsButton=document.getElementById('getMyFriends');
console.log(friendsButton);
const requestsButton=document.getElementById('getMyReq');
const suggestionButton =document.getElementById('getMySugg');
requestsButton.addEventListener('click',fetchRequests);
friendsButton.addEventListener('click',fetchFriends);
suggestionButton.addEventListener('click',fetchSuggestion);

function redirectPage(idFriend){
  window.location.href = `/myProfile.html?idFriend=${idFriend}`;
}
function changeMenu(menu,data) {
    const menus = document.getElementsByClassName('navbar-sect');
    const content = document.getElementById('profiles-content');
    content.innerHTML='';
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
                <img src="${data[i].friend_image}" alt="Profile Picture">
                <h4 onclick="redirectPage(${data[i].friendid})">${data[i].username} </h4>
            </div>`
            
            ;
        }
            
        break;
      case 'friend-requests':
        for(let i=0;i<data.length;i++){
            content.innerHTML += `
          <div class="profile-card">
            <img src="${data[i].friend_image}" alt="Profile Picture">
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
                <img src="${data[i].friend_image}" alt="Profile Picture">
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
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/addFriendFromSugg`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` },
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
  const token = localStorage.getItem('token');
  fetch(`http://localhost:3000/refuseFriend`, {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
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
  const token = localStorage.getItem('token');
  fetch(`http://localhost:3000/acceptFriend`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
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
  const token = localStorage.getItem('token');
  fetch('http://localhost:3000/getRequests', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      changeMenu('friend-requests',data);
    })
    .catch(error => {
      console.error('Error fetching request:', error);
    });
}
function fetchFriends() {
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
        console.log(data.string);
        changeMenu('my-friends',data);
      })
      .catch(error => {
        console.error('Error fetching friends:', error);
      });
  }

  function fetchSuggestion() {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/getFriendSuggestions', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        changeMenu('friend-suggestions',data);
      })
      .catch(error => {
        console.error('Error fetching request:', error);
      });
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
