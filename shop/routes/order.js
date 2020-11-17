module.exports = function(app) {
  app.use("/order", function(request, response){
    response.redirect("/order.html")
  })
}
