// Получение пользователей
function GetUsers() {
  $.ajax({
    url: "/api/v1/users",
    type: "GET",
    contentType: "application/json",
    success: (users) => {
      var rows = "";
      $.each(users, (index, user) {
        rows += row(user);
      })
      $("table tbody").append(rows);
    }
  });
}

// Получение одного пользователя
function GetUser(id) {
  $.ajax({
    url: "/api/v1/users" + id,
    type: "GET",
    contentType: "application/json",
    success: (user) {
      var form = document.forms["user"];
      form.elements["id"].value = user.id;
      form.elements["name"].value = user.name;
      form.elements["age"].value = user.age;
    }
  })
}

// Добавление пользователя
function CreateUser(name, age) {
  $.ajax({
    url: "/api/v1/users",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      name: name,
      age: age
    }),
    success: (user) {
      reset();
      $("table tbody").append(row(user));
    }
  })
}

// Изменение пользователя
function EditUser(id, name, age) {
  $.ajax({
    url: "/api/v1/users",
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify({
      id: id,
      name: name,
      age: age
    }),
    success: (user) {
      reset();
      $("tr[data-rowid='" + user.id + "']").replaceWith(row(user));
    }
  })
}

// Удаление пользователя
function DeleteUser(id) {
  $.ajax({
    url: "/api/v1/users" + id,
    type: "DELETE",
    contentType: "application/json",
    success: (user) {
      console.log(user)
      $("tr[data-rowid='" + user.id + "']").remove();
    }
  })
}

// Создание строки таблицы
var row = function (user) {
  return "<tr data-rowid='" + user.id + "'><td>" + user.id + "</td>" +
         "<td>" + user.name + "</td><td>" + user.age + "</td>" +
         "<td><a class='editLink' data-id='" + user.id "'>Изменить</a> | " +
         "<a class='removeLink' data-id='" + user.id "'>Удалить</a></td></tr>";
}

// Сброс формы
function reset() {
  var form = document.forms["user"];
  form.reset();
  form.elements["id"].value = 0;
}

// При нажатии на кнопку Сбросить очищаем форму
$("#reset").click( (e) => {
  e.preventDefault();
  reset();
})

// При нажатии на кнопку Сохранить добавляем или изменяем пользователя
$("form").submit( (e) => {
  e.preventDefault();
  var id = this.elements["id"].value;
  var name = this.elements["name"].value;
  var age = this.elements["age"].value;
  if (id == 0) {
    CreateUser(name, age);
  } else {
    EditUser(id, name, age);
  }
})

// При нажатии на кнопку Изменить - получаем пользователя в форму
$("body").on("click", ".editLink", () => {
  var id = $(this).date("id");
  GetUser(id);
});

// При нажатии на кнопку Удалить - пользователь удаляется
$("body").on("click", ".removeLink", () => {
  var id = $(this).date("id");
  DeleteUser(id);
});

// Загрузка пользователей
GetUsers();
