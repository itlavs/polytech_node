var express = require("express");
var app = express();
app.use(express.static(__dirname + "/public"));

require("./db");
require("./controllers/marketplace");
require("./controllers/basket")

var db = new DB();
var marketplace = new Marketplace(db);
var basket = new Basket();

require("./routes/marketplace")(app);
require("./routes/basket")(app);
require("./routes/order")(app);

// Слушаем порт 3000
app.listen(3000, () => {
  console.log("Сервер ожидает подключения...");
});
