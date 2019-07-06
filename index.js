const http = require('http');
const path = require('path');
const fs = require('fs');

// const server = http.createServer((req, res) => {  
//   if (req.url === '/')  {
//     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
//       if (err) throw err;
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.end(content);
//     });
//   }

//   if (req.url === '/about')  {
//     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
//       if (err) throw err;
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.end(content);
//     });
//   }

//   if (req.url === '/gallery')  {
//     fs.readFile(path.join(__dirname, 'public', 'gallery.html'), (err, content) => {
//       if (err) throw err;
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.end(content);
//     });
//   }

//   if (req.url === '/contact')  {
//     fs.readFile(path.join(__dirname, 'public', 'contact.html'), (err, content) => {
//       if (err) throw err;
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.end(content);
//     });
//   }

//     if(req.url === '/api') {
//       const users = [{name: 'Bob Smith', age: 40}, {name: 'John Doe', age: 30}];
//       res.writeHead(200, {'Content-Type': 'application/json'});
//       res.end(JSON.stringify(users));
//     }
  
  
// });

const server = http.createServer((req, res) => {
  // Build the file path
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  console.log(req.url);
  console.log(filePath);

  // find out content type 
  let extension = path.extname(filePath);
  //
  console.log(extension);
  let contentType = 'text/html';
  switch(extension) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/css';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  fs.readFile(filePath,  (err, content) => {
    if (err) {
      if(err.code == 'ENOENT') {
        //Page not found
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(content, 'utf8');
        });
      } else {
        res.writeHead(500);
        res.end(`Internal Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content, 'utf8');
    }      
    
  });
  
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT} ...`));