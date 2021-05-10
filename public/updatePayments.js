updatePayments();

async function updatePayments() {
  const username = sessionStorage.getItem("username");
  const request = await fetch(
    route + "/api/payment/updatePayments/" + username,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
