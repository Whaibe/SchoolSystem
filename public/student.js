const infoBanner = document.getElementsByClassName("infoHolder");

getInfo();

async function getInfo(group, tbl1, tbl2) {
  const username = sessionStorage.getItem("username");

  try {
    const data = await fetch(route + "/api/student/getInfo/" + username);

    const student = await data.json();
    console.log(student);

    if (student.students.length > 0) {
      var studentData;
      infoBanner[0].textContent = student.students[0].name;
      infoBanner[1].textContent = student.students[0].lastname;
      infoBanner[2].textContent = student.students[0].group;
      infoBanner[3].textContent = student.students[0].semester;
      for (let i = 0; i < students.students.length; i++) {
        studentData = {
          Name: students.students[i].name,
          LastName: students.students[i].lastname,
          Major: students.students[i].major,
          Id: students.students[i].username,
        };
        arr1.push(studentData);
      }
    } else {
      Swal.fire({
        title: "Information!",
        text: "There are no students available for registration",
        icon: "info",
        confirmButtonText: "Ok",
      });
    }

    tbl1 = buildHtmlTable(arr1);
    group[0].appendChild(tbl1);
    tbl1.className = "table";
    tbl2 = buildHtmlTable(arr2);
    group[1].appendChild(tbl2);
    tbl2.className = "table2";
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
