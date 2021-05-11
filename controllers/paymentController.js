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

async function deletePayments(req, res, username) {
  try {
    await Payment.Payment.deleteMany({ username: username }).catch((err) => {
      res.json({
        status: 404,
        message: "An error ocurred during student deletion",
      });
    });
  } catch (error) {
    res.json({
      message: "An error ocurred during student deletion",
      status: 404,
    });
  }
}

module.exports = { updatePayments, setItems, deletePayments };
