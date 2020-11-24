module.exports = class Marketplace{

  constructor(db) {
    this.db = db;
  }

  async catalog() {
    return await db.products().findAll;
  }

  async popular() {
    return await db.popular().findAll;
  }

  async sale() {
    return await db.sales().findAll;
  }

  async add(product) {
    await db.products().bulkCreate([
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
    return db.products().findAll({
      where: {
        id: id
      }
    });
  }

  async update(product) {
    await db.products().update(
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
    await db.products().destroy({
      where: {
        id: id
      }
    });
  }
}
