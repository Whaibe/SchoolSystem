const { response } = require("express");
const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const groupController = require("../controllers/groupController");
const studentController = require("../controllers/studentController");

router.get("/", (request, response) => {
  response.render("../views/checkout.ejs", {
    inscripcion: 25000,
    colegiatura: 9000,
  });
});

router.get("/success", (request, response) => {
  response.render("../views/success.ejs");
});
router.get("/cancel", (request, response) => {
  response.render("../views/cancel.ejs");
});

module.exports = router;
