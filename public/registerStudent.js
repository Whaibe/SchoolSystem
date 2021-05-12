async function postStudents() {
  const name = document.getElementById("name").value;
  const lastname = document.getElementById("lastname").value;
  const major = document.getElementById("major").value;
  const curp = document.getElementById("curp").value;
  const zip = document.getElementById("zip").value;
  const gender = document.getElementById("gender").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  data = {
    name: name,
    lastname: lastname,
    major: major,
    curp: curp,
    address: zip,
    phone: phone,
    gender: gender,
    password: password,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(route + "/api/register/", options);
    const text = await response.json();
    if (text.status == 200) {
      Swal.fire({
        title: "Succes!",
        text: `User registered succesfully with username:${text.username} and password: ${text.password}`,
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
  } catch (error) {
    Swal.fire({
      title: "Warning!",
      text: "All fields must be filled before submiting",
      icon: "warning",
      confirmButtonText: "Ok",
    });
  }
}
