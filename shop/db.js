class DB {

  constructor() {
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
    this.CLIENTS = sq.define('clients', {
      phone: Sequelise.TEXT,
      email: Sequelise.TEXT});
    this.PRODUCTS = sq.define('products', {
      name: Sequelise.TEXT,
      price: Sequelise.FLOAT,
      articule: Sequelise.TEXT,
      photo: Sequelise.TEXT,
      desctiption: Sequelise.TEXT
    });
    this.ORDERS = sq.define('orders', {
      owner: Sequelise.INTEGER,
      total: Sequelise.FLOAT});
    this.DETAILS = sq.define('details', {
      order: Sequelise.INTEGER,
      product: Sequelise.INTEGER,
      count: Sequelise.INTEGER,
      sum: Sequelise.FLOAT,
    });
    this.BASKET = sq.define('basket', {
      owner: Sequelise.INTEGER,
      product: Sequelise.INTEGER,
      count: Sequelise.INTEGER,
      sum: Sequelise.FLOAT,
    });
    this.POPULAR = sq.define('popular', {
      product: Sequelise.INTEGER
    });
    this.SALES = sq.define('sales', {
      product: Sequelise.INTEGER
    });
    sq.sync({ force: true }).then(() => {
      console.log("База данных успешно создана.")
    });
  }

  clients() {
    return this.CLIENTS;
  }

  products() {
    return this.PRODUCTS;
  }

  orders() {
    return this.ORDERS;
  }

  details() {
    return this.DETAILS;
  }

  basket() {
    return this.BASKET;
  }

  popular() {
    return this.POPULAR;
  }

  sales() {
    return this.SALES;
  }
}

module.exports = DB;
