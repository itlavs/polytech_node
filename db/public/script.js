// Получение пользователей
function getUsers() {
  $.ajax({
    url: "/api/v1/users",
    type: "GET",
    contentType: "application/json",
    success: (users) => {
      var rows = "";
      $.each(users, (index, user) => {
        rows += row(user);
      });
      $("table tbody").append(rows);
    }
  });
}

// Получение одного пользователя
function getUser(id) {
  $.ajax({
    url: "/api/v1/users/" + id,
    type: "GET",
    contentType: "application/json",
    success: (user) => {
      var form = document.forms["user"];
      form.elements["id"].value = user.id;
      form.elements["name"].value = user.name;
      form.elements["age"].value = user.age;
    }
  })
}

// Добавление пользователя
function createUser(name, age) {
  $.ajax({
    url: "/api/v1/users",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      name: name,
      age: age
    }),
    success: (user) => {
      reset();
      $("table tbody").append(row(user));
    }
  })
}

// Изменение пользователя
function editUser(id, name, age) {
  $.ajax({
    url: "/api/v1/users",
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify({
      id: id,
      name: name,
      age: age
    }),
    success: (user) => {
      //reset();
      $("tr[data-rowid='" + user.id + "']").replaceWith(row(user));
    }
  })
}

// Удаление пользователя
function deleteUser(id) {
  $.ajax({
    url: "/api/v1/users/" + id,
    type: "DELETE",
    contentType: "application/json",
    success: (user) => {
      console.log(user)
      $("tr[data-rowid='" + user.id + "']").remove();
    }
  })
}

// Создание строки таблицы
function row(user) {
  return `<tr class="rows" data-rowid="${user.id}">
           <td>${user.id}</td>
           <td>${user.name}</td>
           <td>${user.age}</td>
           <td>
             <button type="button" class="close" data-id="${user.id}">
              <span aria-hidden="true">&times;</span>
             </button>
           </td>
         </tr>`;
}

// Сброс формы
function reset() {
  var form = document.forms["user"];
  form.reset();
  form.elements["id"].value = 0;
}

// При нажатии на кнопку Очистить - очищаем форму
$("#reset").click( function (e) {
  e.preventDefault();
  reset();
})

// При нажатии на кнопку Сохранить - добавляем или изменяем пользователя
$("form").submit( function (e) {
  e.preventDefault();
  var id = this.elements["id"].value;
  var name = this.elements["name"].value;
  var age = this.elements["age"].value;
  if (id == 0) {
    createUser(name, age);
  } else {
    editUser(id, name, age);
  }
})

// При нажатии на строку - получаем пользователя в форму
$("body").on("click", ".rows", function () {
  var id = $(this).data("rowid");
  getUser(id);
});

// При нажатии на кнопку Удалить - пользователь удаляется
$("body").on("click", ".close", function () {
  var id = $(this).data("id");
  deleteUser(id);
});

// Загрузка пользователей
getUsers();
