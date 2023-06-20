const { Pool } = require('pg');
const path = require('path');
const querystring = require('querystring');
const http = require('http');
const url = require('url');
const fs = require('fs');
let userId;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});


const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (req.method === 'GET' && parsedUrl.pathname === '/getFriendsCount') {
    (async () => {
      try {
        const query = 'SELECT COUNT(*) AS friends_count FROM prieteni WHERE id_utilizator = $1';
        const values = [userId];
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
        const query = 'SELECT * FROM getFriendDetails($1)';
        const values = [userId];
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
          res.write('');
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
          res.write('');
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
          res.write(JSON.stringify({ error: 'Friends not found' }));
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
        const query = 'SELECT friend_name, book_title, book_description FROM get_random_friend_book($1)';
        const values = [userId];
        const result = await pool.query(query, values);
        const recommendation = result.rows[0];

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
  }
  
  else if (req.method === 'POST' && parsedUrl.pathname === '/add') {
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
  } else  {
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
