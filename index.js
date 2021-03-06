//Imports
const { response } = require("express");
const express = require("express");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const adminRouter = require("./routes/admin");
const studentRouter = require("./routes/student");
const paymentRouter = require("./routes/paymentService");
const teacherRouter = require("./routes/teacher");
const paymentController = require("./controllers/paymentController");
const stripe = require("stripe")(""); //Add stripe private key

const mongoose = require("mongoose");
const Joi = require("joi"); //Imports Joi package
//add conection string in order to connect to database
mongoose.connect("", { useNewUrlParser: true, useUnifiedTopology: true });

//initialize package
const app = express();

//Middleware
app.use(express.urlencoded());
app.use(express.json());

app.set("views", "./views");

app.engine("ejs", require("ejs").renderFile);

app.use("/style", express.static("style"));
app.use("/public", express.static("public"));

//Routes
app.use("/login", loginRouter);
app.use("/api/register", registerRouter);
app.use("/api/admin", adminRouter);
app.use("/api/student", studentRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/teacher", teacherRouter);

//Open db connection
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
  console.log("Connection established");
});

const YOUR_DOMAIN = "https://primaryschoolsystem.herokuapp.com/";

app.post("/create-checkout-session", async (req, res) => {
  const items = [];
  for (let i = 0; i < req.body.length; i++) {
    var name = req.body[i].name;
    var price = req.body[i].value * 100;
    var item = {
      price_data: {
        currency: "mxn",
        product_data: {
          name: name,
        },
        unit_amount: price,
      },
      quantity: 1,
    };
    items.push(item);
    paymentController.setItems(items);
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items,
    mode: "payment",
    success_url: `https://primaryschoolsystem.herokuapp.com/api/payment/success`,
    cancel_url: `https://primaryschoolsystem.herokuapp.com/api/payment/cancel`,
  });
  res.json({ id: session.id, items: items });
});

const port = process.env.PORT || 3000;
//Restful api
app.listen(port, () => {
  console.log("Escuchando al puerto 3000");
});
