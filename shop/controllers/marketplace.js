class Marketplace{

  constructor(db) {
    this.db = db;
  }

  async catalog() {
    return await this.db.products().findAll();
  }

  async popular() {
    return await this.db.popular().findAll();
  }

  async sale() {
    return await this.db.sales().findAll();
  }

  async add(product) {
    await this.db.products().bulkCreate([
      { id: product.id,
        name: product.name,
        price: product.price,
        articule: product.articule,
        photo: product.photo,
        desctiption: product.description
      }
    ]);
  }

  get(id){
    return this.db.products().findAll({
      where: {
        id: id
      }
    });
  }

  async update(product) {
    await this.db.products().update(
      { id: product.id,
        name: product.name,
        price: product.price,
        articule: product.articule,
        photo: product.photo,
        desctiption: product.description
      }, {
      where: {
        id: product.id
      }
    });
  }

  async delete(id) {
    await this.db.products().destroy({
      where: {
        id: id
      }
    });
  }
}

module.exports = Marketplace;
