var express = require("express");
var app = express();
app.use(express.static(__dirname + "/public"));

const Sequelise = require('sequelize');
const sq = new Sequelise({
  dialect: 'sqlite',
  storage: './db.sqlite'
});
sq.authenticate()
.then(() => {
  console.log('Успешно подключились к базе');
})
.catch(err => {
  consloe.log('Не удалось подключиться к базе:', err);
});
const CLIENTS = sq.define('clients', {
  phone: Sequelise.TEXT,
  email: Sequelise.TEXT});
const PRODUCTS = sq.define('products', {
  name: Sequelise.TEXT,
  price: Sequelise.FLOAT,
  articule: Sequelise.TEXT,
  photo: Sequelise.TEXT,
  desctiption: Sequelise.TEXT
});
const ORDERS = sq.define('orders', {
  owner: Sequelise.INTEGER,
  total: Sequelise.FLOAT});
const DETAILS = sq.define('details', {
  order: Sequelise.INTEGER,
  product: Sequelise.INTEGER,
  count: Sequelise.INTEGER,
  sum: Sequelise.FLOAT,
});
const BASKET = sq.define('basket', {
  owner: Sequelise.INTEGER,
  product: Sequelise.INTEGER,
  count: Sequelise.INTEGER,
  sum: Sequelise.FLOAT,
});
const POPULAR = sq.define('popular', {
  product: Sequelise.INTEGER
});
const SALES = sq.define('sales', {
  product: Sequelise.INTEGER
});
sq.sync({ force: true }).then(() => {
  console.log("База данных успешно создана.")
});

var marketplace = require("./controllers/marketplace");
var basket = require("./controllers/basket");

require("./routes/marketplace")(app);
require("./routes/basket")(app);
require("./routes/order")(app);

// Слушаем порт 3000
app.listen(3000, () => {
  console.log("Сервер ожидает подключения...");
});
