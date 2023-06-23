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

  ///////////////EXPORT CSV

  const exportButton = document.getElementById("exportButton");
exportButton.addEventListener("click", exportStatistics);

function exportStatistics() {
  // Create the CSV content
  const csvContent = generateCSVContent();

  // Create a temporary download link
  const downloadLink = document.createElement("a");
  downloadLink.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
  downloadLink.download = "statistics.csv";

  // Trigger the download
  downloadLink.click();
}

function generateCSVContent() {
  // Retrieve the data from the HTML elements
  const data = {
    totalCarti: totalCarti.innerHTML,
    totalPagini: totalPagini.innerHTML,
    shortestBook: shortestBook.innerHTML,
    longestBook: longestBook.innerHTML,
    shortestBookPages: shortestBookPages.innerHTML,
    longestBookPages: longestBookPages.innerHTML,
    avgPages: avgPages.innerHTML,
    bestAuthor: bestAuthor.innerHTML,
    worstAuthor: worstAuthor.innerHTML,
    bestBook: bestBook.innerHTML,
    worstBook: worstBook.innerHTML,
    avgRating: avgRating.innerHTML
  };

  // Prepare the CSV content
  let csvContent = "";
  for (const key in data) {
    const value = data[key].replace(/"/g, '""'); // Handle special characters
    csvContent += `"${key}","${value}"\n`; // Enclose values in double quotes
  }

  return csvContent;
}


//////////////////////////////// EXPORT DOCBOOK


const exportDocBookButton = document.getElementById("exportDocBookButton");
exportDocBookButton.addEventListener("click", exportStatisticsAsDocBook);

function exportStatisticsAsDocBook() {
  const docBookData = generateDocBookData();
  downloadDataAsFile(docBookData, "statistics.xml", "application/xml");
}

function generateDocBookData() {
  const data = {
    totalCarti: totalCarti.innerHTML,
    totalPagini: totalPagini.innerHTML,
    shortestBook: shortestBook.innerHTML,
    longestBook: longestBook.innerHTML,
    shortestBookPages: shortestBookPages.innerHTML,
    longestBookPages: longestBookPages.innerHTML,
    avgPages: avgPages.innerHTML,
    bestAuthor: bestAuthor.innerHTML,
    worstAuthor: worstAuthor.innerHTML,
    bestBook: bestBook.innerHTML,
    worstBook: worstBook.innerHTML,
    avgRating: avgRating.innerHTML
  };

  // Generate the DocBook XML
  const docBookXml = `
    <book>
      <statistics>
        <totalCarti>${data.totalCarti}</totalCarti>
        <totalPagini>${data.totalPagini}</totalPagini>
        <shortestBook>${data.shortestBook}</shortestBook>
        <longestBook>${data.longestBook}</longestBook>
        <shortestBookPages>${data.shortestBookPages}</shortestBookPages>
        <longestBookPages>${data.longestBookPages}</longestBookPages>
        <avgPages>${data.avgPages}</avgPages>
        <bestAuthor>${data.bestAuthor}</bestAuthor>
        <worstAuthor>${data.worstAuthor}</worstAuthor>
        <bestBook>${data.bestBook}</bestBook>
        <worstBook>${data.worstBook}</worstBook>
        <avgRating>${data.avgRating}</avgRating>
      </statistics>
    </book>
  `;

  return docBookXml;
}

function downloadDataAsFile(data, filename, contentType) {
  const element = document.createElement("a");
  const file = new Blob([data], { type: contentType });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  element.click();
}