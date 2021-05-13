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
  if (jsonData.status == 200) {
    Swal.fire({
      title: "Succes!",
      text: "User Deleted succesfully",
      icon: "success",
      confirmButtonText: "Ok",
    });
    setTimeout(function () {
      window.location.reload();
    }, 3000);
  } else if (text.status == 404) {
    Swal.fire({
      title: "Error!",
      text: "Please fill all inputs before submiting",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else {
    Swal.fire({
      title: "Error!",
      text: "An error ocurred during registration",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}
