module.export = class BasketRoutes{
  constructor(app) {
    this.app = app

    this.app.use("/basket", function(request, response){
      response.redirect("/basket.html")
    })
  }
}
