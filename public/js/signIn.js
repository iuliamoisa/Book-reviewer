function signIn() {
    const email = document.getElementById('emailin').value;
    const password = document.getElementById('passwordin').value;
    const requestBody = {
      email: email,
      password: password
    };
    console.log(requestBody);
    fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (response.ok) {
          return response.json(); 
        } else {
          throw new Error('Sign-in failed');
        }
      })
      .then(data => {
        const token = data.token;
        console.log('Successfully signed in with token:', token);
        window.location.href = '/homeConnected.html';
      })
      .catch(error => {
        console.error(error);
      });
  }
  