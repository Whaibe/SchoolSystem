const { response } = require("express");
const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController");

router.get("/", (request, response) => {
  response.render("login.ejs", {
    error: 0,
  });
});

router.post("/", loginController.login);

module.exports = router;
