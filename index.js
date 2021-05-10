//Imports
const { response } = require("express");
const express = require("express");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const adminRouter = require("./routes/admin");
const studentRouter = require("./routes/student");
const paymentRouter = require("./routes/paymentService");
const stripe = require("stripe")(
  "sk_test_51IpRGeErZiQYNN7iqOTsDAO15INLxcl8HnfhbuvoRhuU2nIKIBKVAmOInq6GQUiFnvt9r6O3ixvozEoch5TnM38o00av78NToI"
);

const mongoose = require("mongoose");
const Joi = require("joi"); //Imports Joi package

mongoose.connect(
  "mongodb+srv://Va:whaibe@main.ua2da.mongodb.net/SchoolDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

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

//Open db connection
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
  console.log("Connection established");
});

const YOUR_DOMAIN =
  "http://localhost:4242https://primaryschoolsystem.herokuapp.com/";

const port = process.env.PORT || 3000;
//Restful api
app.listen(port, () => {
  console.log("Escuchando al puerto 3000");
});
