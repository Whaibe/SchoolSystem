const grid = document.getElementsByClassName("basic-grid");

getGroups(grid);

async function getGroups(grid, tbl1, tbl2) {
  try {
    const data = await fetch(route + "/api/admin/register/getGroups");

    const Jsondata = await data.json();
    console.log(Jsondata);
    if (Jsondata.status == 404) {
      Swal.fire({
        title: "Information!",
        text: "There are no groups registered",
        icon: "info",
        confirmButtonText: "Ok",
      });
    } else {
      console.log(Jsondata.groups);
      for (let i = 0; i < Jsondata.groups.length; i++) {
        var div = document.createElement("div");
        div.className = "container";
        grid[0].appendChild(div);
        var title = document.createElement("tag");
        title.className = "table";
        title.textContent = `Group: ${Jsondata.groups[i].groupnumber}`;
        div.appendChild(title);
        div.appendChild(buildHtmlTable(Jsondata.groups[i].students));
      }
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
