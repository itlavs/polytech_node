module.exports = function(app) {
  app.use("/basket", function(request, response){
    response.redirect("/basket.html")
  })

  app.get("/api/v1/basket", function(request, response){
    response.redirect("/basket.html")
  })
}
