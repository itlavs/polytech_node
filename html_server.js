var http = require('http');
var fs = require('fs');

const hostname = '127.0.0.1';
const port = 8080;
const ok = 200;

var server = http.createServer((req, res) => {
  res.statusCode = ok;
  res.setHeader('Content-Type', 'text/html');
  fs.readFile('index.html', (err, data) => {
      if (err) throw err;
      var text = data.toString();
      res.end(text);
  })
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу: http://${hostname}:${port}/`);
});
