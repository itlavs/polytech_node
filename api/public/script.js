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
    typy: "GET",
    contentType: "application/json",
    success: (user) {
      var form = document.forms["user"];
      form.elemenst["id"].value = user.id;
      form.elemenst["name"].value = user.name;
      form.elemenst["age"].value = user.age;
    }
  })
}
