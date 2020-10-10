var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();
var jsonParser = bodyParser.json();
app.use(express.static(__dirname + "/public"));

// Получение списка пользователей
app.get("/api/v1/users", (req, res) => {
  var content = fs.readFileSync("users.json", "utf8");
  var users = JSON.parse(content);
  res.send(users);
})

app.get("/api/v1/users/:id", (req, res) => {
  var id = req.params.id;
  var content = fs.readFileSync("users.json", "utf8");
  var users = JSON.parse(content);
  var user = null;
  for (var i = 0; i < users.length; i++) {
    if(users[i].id == id){
      user = users[i];
      break;
    }
  }
  if (user){
    res.send(user);
  } else {
    res.status(404).send("Пользователь не найден");
  }
})

// Слушаем порт 3000
app.listen(3000, () => {
  console.log("Сервер ожидает подключения...");
})
