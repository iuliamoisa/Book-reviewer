const images = document.getElementsByClassName('choose-avatar-picture');

for (let i = 0; i < images.length; i++) {
  images[i].addEventListener('click', function() {
    const src = this.src;
    sendImageToServer(src);
  });
}
function sendImageToServer(src) {
  const token = localStorage.getItem('token');
    fetch('/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ src: src })
    })
      .then(response => {
        if (response.ok) {
          console.log('Image sent to the server successfully');
          window.location.href='./settings.html';
        } else {
          console.log('Error sending image to the server');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }