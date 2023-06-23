window.addEventListener("load", fetchStats1);
window.addEventListener("load", fetchStats2);
const totalCarti = document.getElementById("totalCarti");
const totalPagini = document.getElementById("totalPagini");
const shortestBook = document.getElementById("shortestBook");
const longestBook = document.getElementById("longestBook");
const shortestBookPages = document.getElementById("shortPages");
const longestBookPages = document.getElementById("longPages");
const avgPages = document.getElementById("avgPages");
const bestAuthor = document.getElementById("bestAuthor");
const worstAuthor = document.getElementById("worstAuthor");
const bestBook = document.getElementById("bestBook");
const worstBook = document.getElementById("worstBook");
const avgRating = document.getElementById("avgRating");
function fetchStats1() {
    fetch('http://localhost:3000/getStatsUnu')
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
      .then(data => {
        totalCarti.innerHTML = data[0].total_books_read;
        totalPagini.innerHTML = data[0].total_pages_read;
        shortestBook.innerHTML = data[0].shortest_book_title;
        longestBook.innerHTML = data[0].longest_book_title;
        shortestBookPages.innerHTML = "("+data[0].shortest_book_pages + " pages)";
        longestBookPages.innerHTML = "(" +data[0].longest_book_pages + " pages)";
        let avgBooklength = parseInt(data[0].average_book_length);
        avgPages.innerHTML = avgBooklength  + " pages";
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  }
  function fetchStats2() {
    fetch('http://localhost:3000/getStatsDoi')
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
      .then(data => {
        bestAuthor.innerHTML = data[0].most_read_book_author;
        worstAuthor.innerHTML = data[0].least_read_book_author;
        bestBook.innerHTML = data[0].most_read_book_title;
        worstBook.innerHTML = data[0].least_read_book_title;
        let avgRatingLength = data[0].average_rating;
        let avgRatingLength2 = Math.round(avgRatingLength * 100) / 100
        avgRating.innerHTML = avgRatingLength2;
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  }