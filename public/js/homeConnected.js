const books = [
    {
      title: "Harry Potter",
      description: "It's really great, we think you will love it.",
      image: "https://via.placeholder.com/150x200?text=Harry+Potter",
      link: "https://www.example.com/harry-potter",
    },
    {
      title: "The Great Gatsby",
      description: "A classic novel that you won't be able to put down.",
      image: "https://via.placeholder.com/150x200?text=The+Great+Gasby",
      link: "https://www.example.com/the-great-gatsby",
    },
    {
        title: "The Hunger Games",
        author: "Suzanne Collins",
        image: "https://via.placeholder.com/150x200?text=The+Hunger+Games",
        description:
          "It's really great, we think you will love it.",
        link: "https://www.example.com/the-hunger-games"
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        image: "https://via.placeholder.com/150x200?text=To+Kill+a+Mockingbird",
        description:
          "It's really great, we think you will love it.",
        link: "https://www.example.com/to-kill-a-mockingbird"
      }
  ];


const randomBook = books[Math.floor(Math.random() * books.length)];
document.getElementById("book-image").src = randomBook.image;
document.getElementById("book-text").textContent =`Have you tried the book ${randomBook.title}? ${randomBook.description}`;

// Set the link for the "Start Reading" button
const bookButton = document.getElementById("book-button");
bookButton.addEventListener("click", () => {
  window.location.href = randomBook.link;

});

const quotes = [
    "The purpose of literature is to turn blood into ink. \n(T.S. Eliot)",
    "We read to know we're not alone. \n(William Nicholson)",
    "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers. \n(Charles W. Eliot)",
    "A great book should leave you with many experiences, and slightly exhausted at the end. You live several lives while reading. \n(William Styron)",
    "There is no friend as loyal as a book. \n(Ernest Hemingway)",
    "I cannot live without books. \n(Thomas Jefferson)",
    "Books are a uniquely portable magic. \n(Stephen King)",
    "A reader lives a thousand lives before he dies, said Jojen. The man who never reads lives only one. \n(George R.R. Martin)",
    "Once you have read a book you care about, some part of it is always with you. \n(Louis L'Amour)",
    "Reading is a basic tool in the living of a good life. \n(Mortimer J. Adler)"
  ];

const quoteElement = document.getElementById("quote");
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
quoteElement.textContent = randomQuote;

///////////////
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content 
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  }
*/

//////////////////// PT PAGINA SPEICIFCA UNEI CARTI

function redirectToBookPage() {
  // Get the book information from the "connected page"
  const bookTitle = document.getElementById("book-title").textContent;
  const bookCover = document.getElementById("book-image").src;
  const bookDescription = document.getElementById("book-description").textContent;
  const bookAuthor = document.getElementById("book-author").textContent;

  // Encode the book information into the URL
  const queryParams = new URLSearchParams({
    title: bookTitle,
    cover: bookCover,
    description: bookDescription,
    author: bookAuthor
  });

  // Redirect the user to the "book page" with the book information in the URL
 // window.location.href = "book.html?" + queryParams.toString();
 window.location.href = "book.html";
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
