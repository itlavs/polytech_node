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

app.post("/api/v1/users", jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  var name = req.body.name;
  var age = req.body.age;
  var user = {name: name, age: age};

  var content = fs.readFileSync("users.json", "utf8");
  var users = JSON.parse(content);
  if (users.length > 0){
    var id = Math.max.apply(Math, users.map((obj) => {return obj.id}));
    user.id = id + 1;
  } else {
    user.id = 1;
  }
  users.push(user);

  var data = JSON.stringify(users);
  fs.writeFileSync("users.json", data);
  res.send(user);
})

app.delete("/api/v1/users/:id", (req, res) => {
  var id = req.params.id;
  var content = fs.readFileSync("users.json", "utf8");
  var users = JSON.parse(content);
  var index = -1;
  for (var i = 0; i < users.length; i++) {
    if(users[i].id == id){
      index = i;
      break;
    }
  }
  if (index > -1){
    var user = users.splice(index, 1)[0];
    var data = JSON.stringify(users);
    fs.writeFileSync("users.json", data);
    res.send(user);
  } else {
    res.status(404).send("Пользователь не найден");
  }
})

app.put("/api/v1/users", jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  var name = req.body.name;
  var age = req.body.age;
  var id = req.body.id;

  var content = fs.readFileSync("users.json", "utf8");
  var users = JSON.parse(content);
  var user = null;
  for (var i = 0; i < users.length; i++) {
    if(users[i].id == id){
      user = users[i];
      break;
    }
  }

  if(user){
    user.name = name;
    user.age = age;
    var data = JSON.stringify(users);
    fs.writeFileSync("users.json", data);
    res.send(user);
  } else {
    res.status(404).send("Пользователь не найден");
  }
})


// Слушаем порт 3000
app.listen(3000, () => {
  console.log("Сервер ожидает подключения...");
})
