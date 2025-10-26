const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(`Richiesta: ${req.url}`);

  let filePath = '';

  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(__dirname, 'html', 'index.html');
  } else if (req.url === '/pippo' || req.url === '/pippo.html') {
    filePath = path.join(__dirname, 'html', 'pippo.html');
  } else if (req.url === '/video' || req.url === '/video.html') {
    filePath = path.join(__dirname, 'html', 'video.html');
  } else {

    filePath = path.join(__dirname, req.url);
  }
  const ext = path.extname(filePath);
  const mimeTypes = {     //etichetta che dice al browser che tipo di contenuto sta ricevendo
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.mp4': 'video/mp4',
  };

  const contentType = mimeTypes[ext];
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
    readStream.on('error', (streamErr) => {
      res.statusCode = 500;
      res.end('Errore nel server');
    });
  });
});
server.listen(port, hostname, () => {
  console.log(`Server in esecuzione su http://${hostname}:${port}/`);
});
