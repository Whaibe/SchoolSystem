const { response } = require("express");
const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const groupController = require("../controllers/groupController");
const studentController = require("../controllers/studentController");

router.get("/payments", (request, response) => {
  response.render("../views/studentPayments.ejs");
});
router.get("/information", (request, response) => {
  response.render("../views/studentMain.ejs");
});
router.get("/schedule", (request, response) => {
  response.render("../views/studentSchedule.ejs");
});

router.get("/getInfo/:username", studentController.getStudentByName);
router.get("/getPayments/:username", studentController.getPayments);
router.get("/getClasses/:username", studentController.getClasses);

module.exports = router;
