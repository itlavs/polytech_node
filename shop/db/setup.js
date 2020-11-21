module.export = class SetupDb {
  constructor(db) {
    this.db = db;
  }

  clients() {
    this.db.serialize(function() {
      this.db.run('CREATE TABLE clients(id INT, phone CHAR(10), email CHAR(50))');
    });
  }

  products() {
    this.db.serialize(function() {
      this.db.run('CREATE TABLE products(id INT, name CHAR(50), price FLOAT, articule CHAR(50), photo TEXT, desctiption TEXT)');
    });
  }

  orders() {
    this.db.serialize(function() {
      this.db.run('CREATE TABLE orders(id INT, owner INT, total FLOAT)');
    });
  }

  details() {
    this.db.serialize(function() {
      this.db.run('CREATE TABLE details(id INT, order INT, product INT, count INT, sum FLOAT)');
    });
  }

  basket() {
    this.db.serialize(function() {
      this.db.run('CREATE TABLE basket(id INT, owner INT, product INT, count INT, sum FLOAT)');
    });
  }

  popular() {
    this.db.serialize(function() {
      this.db.run('CREATE TABLE popular(id INT, product INT)');
    });
  }

  sales() {
    this.db.serialize(function() {
      this.db.run('CREATE TABLE sales(id INT, product INT)');
    });
  }
}
