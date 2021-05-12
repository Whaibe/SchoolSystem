const { response } = require("express");
const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const groupController = require("../controllers/groupController");
const studentController = require("../controllers/studentController");
const teacherController = require("../controllers/teacherController");

//Get a list of all groups
router.get("/getGroups/:username", teacherController.getGroups);
router.get("/groups", (request, response) => {
  response.render("../views/teacherGroups.ejs");
});
router.get("/schedule", (request, response) => {
  response.render("../views/teacherSchedule.ejs");
});

module.exports = router;
