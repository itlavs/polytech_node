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
