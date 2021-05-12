///erease/student/:username

async function ereaseStudent() {
  const studentId = document.getElementById("inputId").value;
  const data = {
    username: studentId,
  };
  const request = await fetch(route + "/api/admin/erease/student/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const jsonData = await request.json();
  console.log(jsonData);
}
