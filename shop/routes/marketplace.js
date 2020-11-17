module.exports = function(app) {
  app.use("/marketplace", function(request, response){
    response.redirect("/index.html")
  })
}
