const { Pool } = require('pg');
const path = require('path');
const querystring = require('querystring');
const http = require('http');
const url = require('url');
const fs = require('fs'); // acces la sistemul de fisiere
let userId, bookId;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});


const server = http.createServer(async(req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (req.method === 'GET' && parsedUrl.pathname === '/getProfilePic') {
    let idFriend = parsedUrl.query.idFriend;
    console.log("llll",idFriend);
    (async () => {
      try {
        if(idFriend=="null" || idFriend==undefined)
          idFriend=userId;
        console.log("ppW",idFriend);
        const query = 'SELECT imagine FROM utilizatori where id=$1';
        const values = [idFriend];
        const result = await pool.query(query, values);
        const imagine = result.rows[0];

        if (imagine) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(imagine));
          res.end();
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ error: 'Recommendation not found' }));
          res.end();
        }
      } catch (error) {
        console.error('Error getting recommendation:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error: 'Internal server error' }));
        res.end();
      }
    })();
  }else
  if (req.url === '/getImage' && req.method === 'GET') {
    try {
      // Retrieve the image data from the database
      const result = await pool.query('SELECT image_data FROM images WHERE id_utilizator = $1', [userId]);
      const imageData = result.rows[0];
  
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ imageData }));
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Error retrieving image.');
    }
  }
  
  else
  if (req.url === '/upload' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const data = JSON.parse(body);
      const src = data.src;
      
        
      pool.query('update utilizatori set imagine=$1 where id=$2', [src,userId]);
      let status='ok';
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(status));
      console.log(JSON.stringify({'status':'ok'}));
      res.end();
      
      // Process the received image source as needed
      console.log('Received image source:', src);

     
      res.writeHead(302, { 'Location': '/settings.html' });
      res.end();
    });
  }
  else
  if (req.method === 'PUT' && parsedUrl.pathname === '/addFriendFromSugg') {
    let data='';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', async( ) => {
      
      data=JSON.parse(data);
      let idP=data.idFriend;
      console.log(idP);
      const query = 'call add_friend_from_sugg ($1,$2);';
      const values = [userId,idP];

      pool.query(query, values);
      let status='ok';
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(status));
      console.log(JSON.stringify({'status':'ok'}));
      res.end();
    });
  
    
  }
 else if (req.method === 'DELETE' && parsedUrl.pathname === '/refuseFriend') {
    let data='';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', async( ) => {
     
      
      data=JSON.parse(data);
      let idP=data.idFriend;
      console.log(idP);
      const query = 'call refuse_request ($1,$2);';
      const values = [idP,userId];

      pool.query(query, values);
      let status='ok';
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(status));
      console.log(JSON.stringify({'status':'ok'}));
      res.end();
    });
  
    
  }
 else if (req.method === 'PUT' && parsedUrl.pathname === '/acceptFriend') {
    (async () => {
      try {
        let data='';
        req.on('data', chunk => {
          data += chunk;
        });
        req.on('end', async( ) => {
         
          
          data=JSON.parse(data);
          let idP=data.idFriend;
          console.log(idP);
          const query = 'call accept_request ($1,$2);';
        const values = [idP,userId];

        pool.query(query, values);
          let status='ok';
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(status));
          console.log(JSON.stringify({'status':'ok'}));
          res.end();
        
        });
      
        
      } catch (error) {
        console.error('Error getting friends count:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error: 'Internal server error' }));
        res.end();
      }
    })();
  }
 else if (req.method === 'GET' && parsedUrl.pathname === '/getFriendsCount') {
    (async () => {
      try {
        let idFriend = parsedUrl.query.idFriend;
        if(idFriend=="null" || idFriend==undefined)
          idFriend=userId;
        const query = 'SELECT COUNT(*) AS friends_count FROM prieteni WHERE id_utilizator = $1';
        const values = [idFriend];
        const result = await pool.query(query, values);
        const friendsCount = result.rows[0].friends_count;
        console.log(friendsCount);
        if (friendsCount) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(friendsCount));
          res.end();
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ error: 'Friends count not found' }));
          res.end();
        }
      } catch (error) {
        console.error('Error getting friends count:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error: 'Internal server error' }));
        res.end();
      }
    })();
  }
  
  else if (req.method === 'GET' && parsedUrl.pathname === '/getProfileFriends') {
    
    (async () => {
      try {
        let idFriend = parsedUrl.query.idFriend;
        if(idFriend=="null" || idFriend==undefined)
          idFriend=userId;
        const query = 'SELECT * FROM getFriendDetails($1)';
        const values = [idFriend];
        const result = await pool.query(query, values);
        const friendDetails = result.rows;

        if (friendDetails.length > 0) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(friendDetails));
          res.end();
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ error: 'Friend details not found' }));
          res.end();
        }
      } catch (error) {
        console.error('Error getting friend details:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error: 'Internal server error' }));
        res.end();
      }
    })();
  }
  else if (req.method === 'GET' && parsedUrl.pathname === '/getFriendSuggestions') {
    (async () => {
      try {
        const query = 'SELECT * FROM get_friends_with_common_group($1)';
        const values = [userId];
        const result = await pool.query(query, values);
        const friendSuggestions = result.rows;

        if (friendSuggestions.length > 0) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(friendSuggestions));
          res.end();
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ string: 'notOk' }));
          res.end();
        }
      } catch (error) {
        console.error('Error getting friend suggestions:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error: 'Internal server error' }));
        res.end();
      }
    })();
  }

  else if (req.method === 'GET' && parsedUrl.pathname === '/getRequests') {
    (async () => {
      try {
        const query = 'SELECT * FROM get_requests_by_id_utilizator($1)';
        const values = [userId];
        const result = await pool.query(query, values);
        const requests = result.rows;

        if (requests.length > 0) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(requests));
          res.end();
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ string: 'notOk' }));
          res.end();
        }
      } catch (error) {
        console.error('Error getting requests:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error: 'Internal server error' }));
        res.end();
      }
    })();
  } 
  else if (req.method === 'GET' && parsedUrl.pathname === '/getGroups') {
    (async () => {
      try {
        const query = 'SELECT * FROM get_user_groups($1)';
        const values = [userId];
        const result = await pool.query(query, values);
        const groups = result.rows;

        if (groups.length > 0) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(groups));
          res.end();
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ error: 'Groups not found' }));
          res.end();
        }
      } catch (error) {
        console.error('Error getting groups:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error: 'Internal server error' }));
        res.end();
      }
    })();
  }
  else if (req.method === 'GET' && parsedUrl.pathname === '/getFriends') {
    (async () => {
      try {
        const query = 'SELECT * FROM get_usernames_by_id_utilizator($1)';
        const values = [userId];
        const result = await pool.query(query, values);
        const friends = result.rows;
        if (friends.length > 0) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(friends));
          res.end();
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ string: 'notOk' }));
          res.end();
        }
      } catch (error) {
        console.error('Error getting friends:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error: 'Internal server error' }));
        res.end();
      }
    })();
  }

  else if (req.method === 'GET' && parsedUrl.pathname === '/recommendation') {
    (async () => {
      try {
        const query = 'SELECT book_id, friend_name, book_title, book_description FROM get_random_friend_book($1)';
        const values = [userId];
        const result = await pool.query(query, values);
        const recommendation = result.rows[0];
        bookId =  recommendation.book_id;
        if (recommendation) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(recommendation));
          res.end();
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ error: 'Recommendation not found' }));
          res.end();
        }
      } catch (error) {
        console.error('Error getting recommendation:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error: 'Internal server error' }));
        res.end();
      }
    })();
  }else if (req.method === 'POST' && parsedUrl.pathname === '/add') {
    let requestBody = '';

    req.on('data', (chunk) => {
      requestBody += chunk;
    });

    req.on('end', async () => {
      const { fname, lname, username, email, password } = querystring.parse(requestBody);

      try {
        const verifyMail = 'SELECT * FROM utilizatori WHERE email = $1';
        const mailValue = [email];
        const result = await pool.query(verifyMail, mailValue);

        if (result.rowCount > 0) {
          res.writeHead(302, { 'Location': '/error' });
          res.end();
        } else {
          const query = 'INSERT INTO utilizatori (nume, prenume, username, email, parola) VALUES ($1, $2, $3, $4, $5)';
          const values = [fname, lname, username, email, password];
          await pool.query(query, values);
          await pool.query('COMMIT');
          console.log('Values added to the database successfully!');
          res.writeHead(302, { 'Location': '/signIn.html' });
          res.end();
        }
      } catch (error) {
        console.error('Error adding values to the database:', error);
        res.writeHead(500);
        res.end();
      }
    });
  }

  else  if (req.method === 'POST' && parsedUrl.pathname === '/signin') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const formData = querystring.parse(body);
      const email = formData.email;
      const password = formData.password;


      try {
        const query = 'SELECT * FROM utilizatori WHERE email = $1 AND parola = $2';
        const values = [email, password];
        const result = await pool.query(query, values);
        const user = result.rows[0];

        if (user) {
          const idQuery = 'SELECT id FROM utilizatori WHERE email = $1';
          const idRes = await pool.query(idQuery, [user.email]);
          const qValue = idRes.rows[0].id;
          console.log(qValue);
          userId = qValue;
          
          res.writeHead(302, { 'Location': '/homeConnected.html' });
          res.end();
        } else {
          res.statusCode = 401;
          res.end('Wrong credentials. Please try again.');
        }
      } catch (error) {
        console.error('Error handling form submission:', error);
        res.statusCode = 500;
        res.end();
      }
    });
  }
  else if (req.method === 'GET' && parsedUrl.pathname === '/getProfileData') {
    let idFriend = parsedUrl.query.idFriend;
    console.log("idFriend ",idFriend);
    (async () => {
      try {
        if(idFriend=="null" || idFriend==undefined)
          idFriend=userId;
        console.log("!!!!",idFriend);
        const query1 = 'SELECT * FROM utilizatori WHERE id = $1';
        const values = [idFriend];const getBooksValues = [idFriend];const getReadingBooksValues = [userId];
        const result = await pool.query(query1, values);
        const user = result.rows[0];

        const query2 = 'SELECT COUNT(*) AS finishedBooksCount FROM progres WHERE id_utilizator = $1 AND status_carte = true';
        const booksResult = await pool.query(query2, getBooksValues);
        const booksCount = booksResult.rows[0].finishedbookscount;

        const query3 = 'SELECT COUNT(*) AS readingBooksCount FROM progres WHERE id_utilizator = $1 AND status_carte = false AND data_start is not null';
        const readingBooksResult = await pool.query(query3, getReadingBooksValues);
        const readingBooksCount = readingBooksResult.rows[0].readingbookscount;

        const query4 = 'SELECT COUNT(*) AS toReadBooksCount FROM progres WHERE id_utilizator = $1 AND status_carte = false AND data_start is null';
        const toReadBooksResult = await pool.query(query4, getReadingBooksValues);
        const toReadBooksCount = toReadBooksResult.rows[0].toreadbookscount;
        if (user) {
          const profileData = {
            name: `${user.nume} ${user.prenume}`,
            booksCount: booksCount,
            readingBooksCount: readingBooksCount,
            toReadBooksCount: toReadBooksCount
            // profilePicUrl: user.profilePicUrl, // Replace with the actual column name for the profile picture URL
          };
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(profileData));
          res.end();
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ error: 'User not found' }));
          res.end();
        }
      } catch (error) {
        console.error('Error getting profile data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error: 'Internal server error' }));
        res.end();
      }
    })();
  }
  else if (req.method === 'GET' && parsedUrl.pathname === '/logout') {
    // Clear the userId or perform any other necessary logout actions
    userId = null;
  
    // Redirect the user to the login page or any other desired destination
    res.writeHead(302, { 'Location': '/signIn.html' });
    res.end();
  }else if(parsedUrl.pathname ==='/book'){
    const bookId = parsedUrl.query.bookId;
    (async () => {
      try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM carti WHERE id = $1', [bookId]);
        const book = result.rows[0];
  
        if (book) {
          fs.readFile('./public/book.html', 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading book.html file:', err);
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Internal Server Error');
            } else {
              const html = data
                .replace('{{book-image}}',`https://via.placeholder.com/150x200?text=${encodeURIComponent(book.titlu)}`)
                .replace('{{book-title}}', book.titlu)
                .replace('{{book-author}}', book.autor)
                .replace('{{book-description}}', book.descriere);
  
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.write(html);
              res.end();
            }
          });
        } 
        else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Book not found');
        }
  
        client.release();
      } catch (error) {
        console.error('Error retrieving book details:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    })();

  } else  if (parsedUrl.pathname === '/reviews' && req.method === 'GET') { // TOATE RECENZIILE
    const query = 'SELECT u.nume, u.prenume, r.timestamp AS review_timestamp, r.rating, r.recenzie_text, c.titlu, c.autor FROM recenzii r JOIN carti c ON r.id_carte = c.id JOIN utilizatori u ON r.id_utilizator = u.id';

    pool.query(query, (err, result) => {
      if (err) {
        console.error('Error fetching reviews:', err);
        res.statusCode = 500;
        res.end('Error fetching reviews');
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(result.rows));
      }
    });
  }
  else if (parsedUrl.pathname === '/certainBookReviews' && req.method === 'GET') {
    (async () => {
      try {
        const query = 'SELECT r.rating, r.recenzie_text, u.nume, u.prenume FROM recenzii r INNER JOIN utilizatori u ON r.id_utilizator = u.id WHERE r.id_carte = $1';
        const result = await pool.query(query, [bookId]);
  
        const reviews = result.rows;
  console.log(reviews);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(reviews));
      } catch (error) {
        console.error('Error fetching reviews:', error);
        res.statusCode = 500;
        res.end('Error fetching reviews');
      }
    })();
  }
  else if (req.method === 'GET' && parsedUrl.pathname === '/getStatsUnu') {
    (async () => {
      try {
        const query = 'SELECT * from get_user_reading_stats($1)';
        const values = [userId];
        const result = await pool.query(query, values);
      const statistics = result.rows;
      console.log("statistics", statistics);
        if (statistics) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(statistics));
          res.end();
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ error: 'Statistics not found' }));
          res.end();
        }
      } catch (error) {
        console.error('Error getting statistics:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error: 'Internal server error' }));
        res.end();
      }
    })();
  }
  else if (req.method === 'GET' && parsedUrl.pathname === '/getStatsDoi') {
    (async () => {
      try {
        const query = 'SELECT * FROM get_user_book_stats($1)';
        const values = [userId];
        const result = await pool.query(query, values);
      const statistics2 = result.rows;
      console.log("statistics2", statistics2);
        if (statistics2) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(statistics2));
          res.end();
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ error: 'Statistics2 not found' }));
          res.end();
        }
      } catch (error) {
        console.error('Error getting statistics2:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error: 'Internal server error' }));
        res.end();
      }
    })();
  }
  else // ADAUGA IN TO READ LIST
  if (req.method === 'POST' && req.url === '/add-to-reading-list') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      body = JSON.parse(body);
      let bookId = body.bookId;
      console.log("AICI: " + bookId);
      console.log(userId);
      const query = 'INSERT INTO biblioteca (id_utilizator, id_carte, categorie) VALUES ($1, $2, $3)';
      const values = [userId, bookId, 1]; 
      const query2 = 'INSERT INTO progres (id_utilizator, id_carte, pagina_curenta, data_start, status_carte) VALUES ($1, $2, $3, $4, $5)';
      const values2 = [userId, bookId, 0, new Date(),false]
      pool.query(query, values, (err) => {
        if (err) {
          console.error('Error adding book to reading list:', err);
          res.statusCode = 500;
          res.end();
        } else {
          res.statusCode = 200;
          res.end();
        }
      });
      pool.query(query2, values2, (err) => {
        if (err) {
          console.error('Error adding book to progress list:', err);
          res.statusCode = 500;
          res.end();
        } else {
          res.statusCode = 200;
          res.end();
        }
      });
    });
  }else if (req.method === 'POST' && req.url === '/submit-review') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    const bookId = parsedUrl.query.bookId;
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (!data.rating) {
          res.statusCode = 400;
          res.end('Rating is required');
          return;
        }
        const query = `
          INSERT INTO recenzii (id_utilizator, id_carte, recenzie_text, rating, timestamp)
          VALUES ($1, $2, $3, $4, $5)
        `;
        const parameters = [
          userId,
          data.book_id,
          data.reviewText,
          data.rating,
          new Date()
        ];
        pool.query(query, parameters, (err) => {
          if (err) {
            console.error('Error inserting review:', err);
            res.statusCode = 500;
            res.end('Error inserting review');
          } else {
            res.statusCode = 200;
            res.end('Review submitted successfully');
          }
        });
      } catch (error) {
        console.error('Error parsing request body:', error);
        res.statusCode = 400;
        res.end('Invalid request body');
      }
    });
  }else if (req.method === 'GET' && parsedUrl.pathname === '/getBookDetails') {
    (async () => {
      try {
        const query = 'SELECT * FROM get_user_book_progress($1);';
        const values = [userId];
        const result = await pool.query(query, values);
        const book_details = result.rows;
        if (book_details) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(book_details));
          res.end();
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ error: 'book_details not found' }));
          res.end();
        }
      } catch (error) {
        console.error('Error getting book_details:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error: 'Internal server error' }));
        res.end();
      }
    })();
  }
  else if (req.method === 'GET' && (parsedUrl.pathname === '/getCurrentlyReadingDetails' ||
  parsedUrl.pathname === '/getToReadDetails' || 
  parsedUrl.pathname === '/getReadDetails')) {
    (async () => {
      try {
        const query = 'SELECT * FROM get_all_books($1,$2);';
        let values ;
        if(parsedUrl.pathname === '/getCurrentlyReadingDetails')
          values = [userId, 2];
        else if(parsedUrl.pathname === '/getToReadDetails')
          values = [userId, 1];
        else if(parsedUrl.pathname === '/getReadDetails')
          values = [userId, 3];
        const result = await pool.query(query, values);
        const book_details = result.rows;
        if (book_details) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(book_details));
          res.end();
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ error: 'book_details not found' }));
          res.end();
        }
      } catch (error) {
        console.error('Error getting book_details:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error: 'Internal server error' }));
        res.end();
      }
    })();
  }else if(req.method === 'GET' && parsedUrl.pathname === '/getByKeyword') {
    const keyword = parsedUrl.query.keyword;
    const query = 'SELECT id, titlu FROM carti WHERE titlu LIKE $1';
    const values = [`%${keyword}%`];
    (async () => {
      try {
        const result = await pool.query(query, values);
        const books = result.rows;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(books));
        res.end();
      } catch (error) {
        console.error('Error getting books:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error: 'Internal server error' }));
        res.end();
      }
    }
    )();

  }
  else  {
    // Serve static files
    let filePath = path.join(__dirname, 'public', parsedUrl.pathname);
    if (parsedUrl.pathname === '/') {
      filePath = path.join(__dirname, 'public', 'home.html');
    } else if (parsedUrl.pathname === '/styles/main.css') {
      filePath = path.join(__dirname, 'public', 'styles', 'main.css');
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('File not found');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', getContentType(filePath));
        res.end(data);
      }
    });
  }
});

function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'application/javascript';
    case '.json':
      return 'application/json';
      case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'text/plain';
  }
}
server.listen(3000, () => {
  console.log('Server started on http://localhost:3000/');
});
