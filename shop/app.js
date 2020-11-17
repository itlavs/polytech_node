var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var sqlite3 = require("sqlite3").verbose();

var app = express();
var jsonParser = bodyParser.json();
app.use(express.static(__dirname + "/public"));
//var db = new sqlite3.Database(':memory:');
var db = new sqlite3.Database('db.db');

var marketplace = require("./controllers/marketplace");
var basket = require("./controllers/basket");

require("./routes/marketplace")(app);
require("./routes/basket")(app);
require("./routes/order")(app);

// Слушаем порт 3000
app.listen(3000, () => {
  console.log("Сервер ожидает подключения...");
});

process.on('SIGINT', () => {
    db.close();
    server.close();
});
