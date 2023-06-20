// const createButton=document.getElementById('createButton');
// createButton.addEventListener('click',fetchEmail);
// window.addEventListener('load',checkMess);

// function checkMess(){
//     // localStorage.setItem('email','nok');
//      console.log(localStorage.getItem('email'));
    
//     if(localStorage.getItem('email')){
//         const err=document.getElementById("forError");
//         err.innerHTML='';
//         err.innerHTML='The email is already in use!';
//         localStorage.clear();
//     }
// }

// function fetchEmail() {
  
//     fetch('/add')
//       .then(response => response.json())
//       .then(data => {
//         // Update the HTML elements with the recommendation data
//         const err=document.getElementById("forError");
//         err.innerHTML='';
//         console.log(data);
//         console.log(data.length);
//         if(data=="nok"){
//            localStorage.setItem('email','nok');
//             err.innerHTML='The email is already in use!';
//             console.log(err);
//             window.location.href='/signUp';
           
//         }
        
        
//       })
//       .catch(error => {
//         console.error('Error fetching friends:', error);
//       });
//   }