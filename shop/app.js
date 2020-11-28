var express = require("express");
var app = express();
app.use(express.static(__dirname + "/public"));

const DB = require("./db");
const Marketplace = require("./controllers/marketplace");
const Basket = require("./controllers/basket");

let db = new DB();
let marketplace = new Marketplace(db);
let basket = new Basket();

require("./routes/marketplace")(app, db);
require("./routes/basket")(app);
require("./routes/order")(app);

// Слушаем порт 3000
app.listen(3000, () => {
  console.log("Сервер ожидает подключения...");
});
