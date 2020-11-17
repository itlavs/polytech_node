module.exports = function(app) {
  app.use("/basket", function(request, response){
    response.redirect("/basket.html")
  })
}
