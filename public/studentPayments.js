getPayments();

async function getPayments() {
  const username = sessionStorage.getItem("username");
  const data = await fetch(
    "https://primaryschoolsystem.herokuapp.com/api/student/getPayments/" +
      username
  );
  const jsonData = await data.json();
  console.log(jsonData);
  const flex = document.getElementsByClassName("basic-flex");
  for (let i = 0; i < jsonData.payments.length; i++) {
    var paymentContainer = document.createElement("div");
    paymentContainer.className = "paymentContainer";

    var conceptHolder = document.createElement("tag");
    conceptHolder.id = "conceptHolder";

    var valueHolder = document.createElement("tag");
    valueHolder.id = "valueholder";

    var date = document.createElement("tag");
    date.id = "dateHolder";

    var dueDate = document.createElement("tag");
    dueDate.id = "dueDate";

    var status = document.createElement("tag");
    status.id = "status";

    var statusHolder = document.createElement("tag");
    statusHolder.id = "statusHolder";

    conceptHolder.textContent = jsonData.payments[i].concept;
    valueHolder.textContent = "$" + jsonData.payments[i].value;
    date.textContent = jsonData.payments[i].date;
    dueDate.textContent = "DueDate:";
    status.textContent = "Status:";
    statusHolder.textContent = jsonData.payments[i].status;

    flex[0].appendChild(paymentContainer);
    paymentContainer.appendChild(conceptHolder);
    paymentContainer.appendChild(valueHolder);
    paymentContainer.appendChild(dueDate);
    paymentContainer.appendChild(date);
    paymentContainer.appendChild(status);
    paymentContainer.appendChild(statusHolder);
  }
}
