async function getToken() {
  const username = document.getElementById("login-username").value;
  sessionStorage.setItem("username", username);
  const request = await fetch(route + "/login/", {
    method: "POST",
  });
  const token = await request.json();
  sessionStorage.setItem("token", token.token);

  const getRequest = await fetch("http://localhost:3000/api/admin/", {
    headers: {
      Authorization: token.token,
    },
  });
}
