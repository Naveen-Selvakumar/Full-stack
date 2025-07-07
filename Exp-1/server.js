const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;

  if (filePath === './') {
    filePath = './index.html';
  }

  const ext = path.extname(filePath);
  let contentType = 'text/html';

  if (ext === '.css') {
    contentType = 'text/css';
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
