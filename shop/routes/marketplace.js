var marketplace = require("../controllers/marketplace");
var product_module = require("../models/product");

module.exports = function(app) {
  app.use("/marketplace", function(request, response){
    response.redirect("/index.html")
  })

  app.get("api/v1/marketplace", function(request, response){
    res.send(marketplace.catalog());
  })

  app.get("api/v1/popular", function(request, response){
    res.send(marketplace.popular());
  })

  app.get("api/v1/sale", function(request, response){
    res.send(marketplace.sale());
  })

  app.post("api/v1/marketplace/add", function(request, response){
    var product = new product_module("Арбуз", 50.00);
    marketplace.add(product);
    res.send(marketplace.catalog());
  })

  app.put("api/v1/marketplace/:id/update", function(request, response){
    var id = req.params.id;
    // product = marketplace.get(id);
    var product = new product_module("Арбуз", 50.00);
    marketplace.update(product);
    res.send(marketplace.catalog());
  })

  app.get("api/v1/marketplace/:id", function(request, response){
    var id = req.params.id;
    // product = marketplace.get(id);
    var product = new product_module("Арбуз", 50.00);
    res.send(product);
  })

  app.delete("api/v1/marketplace/:id/delete", function(request, response){
    var id = req.params.id;
    marketplace.delete(id);
    res.send(marketplace.catalog());
  })
}
