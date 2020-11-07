var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var sqlite3 = require("sqlite3").verbose();

var app = express();
var jsonParser = bodyParser.json();
app.use(express.static(__dirname + "/public"));
//var db = new sqlite3.Database(':memory:');
var db = new sqlite3.Database('db');

// Создание базы данных
db.serialize(function() {
  db.run('DROP TABLE users');
  db.run('CREATE TABLE users(id INT, name TEXT, age INT)');
  db.run('INSERT INTO users VALUES (1, "Ivan", 23)');
  db.run('INSERT INTO users VALUES (2, "Sergey", 20)');
  db.run('INSERT INTO users VALUES (3, "Lena", 18)');

  db.each('SELECT * FROM users', function(err, row) {
    //console.log(row.id + " " + row.name + " " + row.age);
  });
});
var users;

// Чтение базы данных
function readDB(users){
  return new Promise(function(resolve, reject) {
    db.serialize(function() {
      users = [];
      var count = 0;
      db.all('SELECT COUNT(id) as count_id FROM users', function(err, rows){
        var count = rows[0]["count_id"];
        i = 0;
        db.each('SELECT id, name, age FROM users', function(err, row) {
          //console.log(row.id + " " + row.name + " " + row.age);
          var user = {id:row.id, name:row.name, age:row.age};
          // console.log(user);
          users.push(user);
          i++;
          if (i == count) {
           resolve(users);
          }
        });
      });
    });
  });
}

// Доавление в базу данных
function addToDB(user){
  return new Promise(function(resolve, reject) {
    db.serialize(function() {
      var count = 0;
       db.all('SELECT COUNT(id) as count_id FROM users', function(err, rows){
         var count = rows[0]["count_id"];
         db.run('INSERT INTO users VALUES (?, ?, ?)', [count, user.name, user.age]);
         resolve(user);
       });
    });
  });
}

// Изменение записи в базе данных
function editInDB(user){
  return new Promise(function(resolve, reject) {
    db.serialize(function() {
     db.run('UPDATE users SET name = ?, age = ? WHERE id = ?', [user.name, user.age, user.id]);
     resolve(user);
    });
  });
}

// Получение списка пользователей
app.get("/api/v1/users", (req, res) => {
  // var content = fs.readFileSync("users.json", "utf8");
  // var users = JSON.parse(content);
  readDB().then(
    users => {
        res.send(users);
    },
    error => {
      res.status(404).send("Ошибка при получении списка пользователей");
    }
  );
})

app.get("/api/v1/users/:id", (req, res) => {
  // var content = fs.readFileSync("users.json", "utf8");
  // var users = JSON.parse(content);
  readDB().then(
    users => {
      var id = req.params.id;
      var user = null;
      //console.log(users);
      //console.log(users.length);
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
    },
    error => {
      res.status(404).send("Ошибка при получении списка пользователей");
    }
  );

})

app.post("/api/v1/users", jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  var name = req.body.name;
  var age = req.body.age;
  var user = {name: name, age: age};

  // var content = fs.readFileSync("users.json", "utf8");
  // var users = JSON.parse(content);
  readDB().then(
    users => {
      if (users.length > 0){
        var id = Math.max.apply(Math, users.map((obj) => {return obj.id}));
        user.id = id + 1;
      } else {
        user.id = 1;
      }
      users.push(user);

      // var data = JSON.stringify(users);
      // fs.writeFileSync("users.json", data);
      addToDB(user).then(
        dbUser => {
          res.send(dbUser);
        },
        error => {
          res.status(404).send("Ошибка при добавлении пользователя");
        }
      );
    },
    error => {
      res.status(404).send("Ошибка при получении списка пользователей");
    }
  );

})

app.delete("/api/v1/users/:id", (req, res) => {
  var id = req.params.id;
  // var content = fs.readFileSync("users.json", "utf8");
  // var users = JSON.parse(content);
  readDB().then(
    users => {
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
    },
    error => {
      res.status(404).send("Ошибка при получении списка пользователей");
    }
  );
})

app.put("/api/v1/users", jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  var name = req.body.name;
  var age = req.body.age;
  var id = req.body.id;

  // var content = fs.readFileSync("users.json", "utf8");
  // var users = JSON.parse(content);
  readDB().then(
    users => {
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
        editInDB(user).then(
          dbUser => {
            // var data = JSON.stringify(users);
            // fs.writeFileSync("users.json", data);
            res.send(user);
          },
          error => {
            res.status(404).send("Ошибка при изменении пользователя");
          }
        );
      } else {
        res.status(404).send("Пользователь не найден");
      }
    },
    error => {
      res.status(404).send("Ошибка при получении списка пользователей");
    }
  );
});

// Слушаем порт 3000
app.listen(3000, () => {
  console.log("Сервер ожидает подключения...");
});

process.on('SIGINT', () => {
    db.close();
    server.close();
});
