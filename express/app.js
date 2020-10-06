const express = require("express");
const fs = require("fs")

const app = express();

app.use(function(request, response, next){
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let text = `${hour}:${minutes}:${seconds} ${request.method} ${request.url}`;
  console.log(text);
  fs.appendFile("server.log", text + "\n", function(){})
  next();
})

app.get("/", function(request, response){
  response.send("<h1>Привет от Express!</h1>");
  console.log("root");
});

app.get("/about", function(request, response){
  response.send("<h1>О сайте</h1>");
  console.log("about");
});

app.get("/contacts", function(request, response){
  response.send("<h1>Контакты</h1>");
  console.log("contacts");
});

app.listen(3000);
