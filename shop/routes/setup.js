ar setup_db = require("../db/setup");

module.exports = function(app, db) {
  app.use("/setup", function(request, response){
    setup_db(db).clients();
    response.redirect("/setup.html");
  })
}
