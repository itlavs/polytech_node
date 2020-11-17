module.exports = function(app) {
  app.use("/order", function(request, response){
    response.redirect("/order.html")
  })

  app.get("/api/v1/order", function(request, response){
    response.redirect("/order.html")
  })
}
