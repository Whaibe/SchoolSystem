// async function goRegister() {
//   const token = sessionStorage.getItem("token");
//   const request = await fetch("http://localhost:3000/api/admin/register/show", {
//     method: "POST",
//     headers: {
//       Authorization: token.token,
//     },
//   });
// }

function goRegister() {
  window.location.replace("http://localhost:3000/api/admin/register/show#");
}

function goGroups() {
  window.location.replace("http://localhost:3000/api/admin/register/group");
}

function goMain() {
  window.location.replace("http://localhost:3000/api/admin/");
}
