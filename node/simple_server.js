var http = require('http');

const hostname = '127.0.0.1';
const port = 8080;
const ok = 200;

var server = http.createServer((req, res) => {
  res.statusCode = ok;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello text');
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу: http://${hostname}:${port}/`);
});
