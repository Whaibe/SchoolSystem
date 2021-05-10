//Main
var value;
var index;

var arr2 = [];
var arr1 = [];

const group = document.getElementsByClassName("groups");
var table1, table2;

getStudents(group, table1, table2);

$(document).on("click", ".table tr", function () {
  value = $(this).find("td:first").html();
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].Name == value) {
      const item = arr1.splice(i, 1);
      arr2.push(item[0]);
      console.log(arr2);
      console.log(arr1);
    }
  }
  var row = $(this).closest("tr").clone();
  var tbl = $(document).find(".table2");
  var tlast = tbl.find("tr:last");

  tlast.after(row);

  var r = $(this).closest("tr").remove();
});

async function getStudents(group, tbl1, tbl2) {
  try {
    const data = await fetch(localRoute + "/api/admin/register/studentData");

    const students = await data.json();
    console.log(students);

    if (students.students.length > 0) {
      var studentData;

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

async function sendGroups() {
  const groupNum = document.getElementById("inputGroup").value;
  data = { groupnumber: groupNum, students: arr2 };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(
      localRoute + "/api/admin/register/group",
      options
    );
    const text = await response.json();
    if (text.status == 200) {
      Swal.fire({
        title: "Succes!",
        text: "User registered succesfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
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
