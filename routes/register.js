const { response } = require("express");
const express = require("express");
const router = express.Router();

const registerController = require("../controllers/registerController");

router.post("/", registerController.registerStudent);
//router.post("/admin", authController.registerAdmin);
//router.post("/teacher", registerController.registerTeacher);

module.exports = router;
