const Payment = require("../models/payment");

var items = [];
async function updatePayments(req, res, next) {
  const username = req.params.username;
  for (let i = 0; i < items.length; i++) {
    var value = items[i].price_data.unit_amount / 100;

    var payment = await Payment.Payment.updateOne(
      { username: username, value: value },
      { status: "Pagado" }
    );
  }
  //value: items[i].price_data.unit_amount
  res.send("va");
}

function setItems(item) {
  items = item;
}

module.exports = { updatePayments, setItems };
