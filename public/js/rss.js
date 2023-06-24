function getRssFeed() {
    fetch('/reviews')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching reviews');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        console.log(data.length);
        console.log(data[0].titlu);
        console.log(data[0].id);
  
        let rssFeed = '  <?xml version="1.0" encoding="UTF-8"?>\n';
        rssFeed += '   <rss version="2.0">\n';
        rssFeed += '     <channel>\n';
        rssFeed += '        <title>BookReviews</title>\n';
        rssFeed += '        <link>http://localhost:3000/</link>\n';
        rssFeed += '        <description>BookReviews</description>\n';
        rssFeed += '        <language>en-us</language>\n';
    
        for (let i = 0; i < data.length; i++) {
          rssFeed += '          <item>\n';
          rssFeed += `            <title>${data[i].titlu}</title>\n`;
          rssFeed += `            <author>${data[i].nume} ${data[i].prenume}</author>\n`;
          rssFeed += `            <link>http://localhost:3000/book?bookId=${data[i].id}</link>\n`;
          rssFeed += `            <description>${data[i].recenzie_text}</description>\n`;
          rssFeed += `            <pubDate>${data[i].review_timestamp}</pubDate>\n`;
          rssFeed += '          </item>\n';
        }
  
        rssFeed += '     </channel>\n';
        rssFeed += '  </rss>\n';
  
        const rssFeedContainer = document.getElementById('rss-output');
        rssFeedContainer.textContent = rssFeed;
  
      });
  }
  
  window.addEventListener('load', getRssFeed);
