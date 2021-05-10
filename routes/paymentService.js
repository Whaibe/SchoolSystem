const { response } = require("express");
const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const groupController = require("../controllers/groupController");
const studentController = require("../controllers/studentController");

app.get("/", (request, response) => {
  response.render("../views/checkout.html");
});

app.get("/success", (request, response) => {
  response.render("../views/success.html");
});
app.get("/cancel", (request, response) => {
  response.render("../views/cancel.html");
});

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Stubborn Attachments",
            images: ["https://i.imgur.com/EHyR2nP.png"],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:4242https://primaryschoolsystem.herokuapp.com/api/payment/success`,
    cancel_url: `http://localhost:4242https://primaryschoolsystem.herokuapp.com/api/payment/cancel`,
  });
  res.json({ id: session.id });
});

module.exports = router;
