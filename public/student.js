const infoBanner = document.getElementsByClassName("infoHolder");

getInfo();
getClasses();

async function getInfo(group, tbl1, tbl2) {
  const username = sessionStorage.getItem("username");

  try {
    const data = await fetch(route + "/api/student/getInfo/" + username);

    const student = await data.json();
    console.log(student);

    if (student.students.length > 0) {
      infoBanner[0].textContent = student.students[0].name;
      infoBanner[1].textContent = student.students[0].lastname;
      infoBanner[2].textContent = student.students[0].group;
      infoBanner[3].textContent = student.students[0].semester;
    } else {
      Swal.fire({
        title: "Information!",
        text: "There are no students available for registration",
        icon: "info",
        confirmButtonText: "Ok",
      });
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: "There are no groups registered",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}

async function getClasses() {
  const username = sessionStorage.getItem("username");
  const data = await fetch(route + "/api/student/getClasses/" + username);
  const jsonData = await data.json();
  console.log(jsonData.classes);
  const grid = document.getElementsByClassName("basic-grid");
  for (let i = 0; i < jsonData.classes.length; i++) {
    var container = document.createElement("div");
    container.className = "container";
    var name = document.createElement("tag");
    name.id = "className";
    name.style.fontSize = "x-large";

    name.textContent = jsonData.classes[i].nombre;
    container.appendChild(name);
    grid[0].appendChild(container);
  }
}
