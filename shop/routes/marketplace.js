module.export = class MarketplaceRoutes{
  constructor(app) {
    this.app = app

    this.app.use("/marketplace", function(request, response){
      response.redirect("/index.html")
    })
  }
}
