window.addEventListener("load", fetchStats1);
function fetchStats1() {
    fetch('http://localhost:3000/getStatsUnu')
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
      .then(data => {
        console.log("UITA TE AICI: " ,data);
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  }