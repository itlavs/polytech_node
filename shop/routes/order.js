module.export = class OrderRoutes{
  constructor(app) {
    this.app = app

    this.app.use("/order", function(request, response){
      response.redirect("/order.html")
    })
  }
}
