const { response } = require("express");
const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const groupController = require("../controllers/groupController");
const studentController = require("../controllers/studentController");

router.get("/", (request, response) => {
  response.render("adminGroupsMain.ejs");
});

router.get("/register", (request, response) => {
  response.redirect("register/show");
});

//Go register student page
router.get("/register/show", (request, response) => {
  response.render("registerStudent.ejs");
});

router.post("/register/show", (request, response) => {
  response.render("registerStudent.ejs");
});

//Go register group page
router.get("/register/group", (request, response) => {
  response.render("../views/adminGroupsAlta.ejs");
});

//Get student data
router.get("/register/studentData", studentController.getStudent);

//Register a group
router.post("/register/group", registerController.registerGroup);
//Get a list of all groups
router.get("/register/getGroups", groupController.getGroups);

module.exports = router;
