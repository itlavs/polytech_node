const Marketplace = require("../controllers/marketplace");
var product_module = new require("../models/product");
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

module.exports = function(app, db) {
  let marketplace = new Marketplace(db);

  app.use("/marketplace", function(request, response){
    response.redirect("/index.html")
  })

  app.get("/api/v1/marketplace", function(request, response){
    response.send(marketplace.catalog());
  })

  app.get("/api/v1/popular", function(request, response){
    response.send(marketplace.popular());
  })

  app.get("/api/v1/sale", function(request, response){
    response.send(marketplace.sale());
  })

  app.post("/api/v1/marketplace/add", jsonParser, function(request, response){
    var product = new product_module("Арбуз", 50.00);
    marketplace.add(product);
    response.send(marketplace.catalog());
  })

  app.put("/api/v1/marketplace/:id/update", jsonParser, function(request, response){
    var id = req.params.id;
    // product = marketplace.get(id);
    var product = new product_module("Арбуз", 50.00);
    marketplace.update(product);
    response.send(marketplace.catalog());
  })

  app.get("/api/v1/marketplace/:id", function(request, response){
    var id = request.params.id;
    // product = marketplace.get(id);
    var product = new product_module("Арбуз", 50.00);
    response.send(product);
  })

  app.delete("/api/v1/marketplace/:id/delete", function(request, response){
    var id = request.params.id;
    marketplace.delete(id);
    response.send(marketplace.catalog());
  })
}
