const User = require("../models/user");
const Group = require("../models/groups");
const studentController = require("../controllers/studentController");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { response } = require("express");

async function registerStudent(req, res, next) {
  var username;
  const lastStudent = await User.Student.find().sort({ $natural: -1 }).limit(1);

  if (lastStudent.length == 0) {
    username = 1;
  } else {
    username = lastStudent[0].username + 1;
  }
  console.log(username);

  bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    const student = new User.Student({
      name: req.body.name,
      lastname: req.body.lastname,
      major: req.body.major,
      CURP: req.body.curp,
      address: req.body.address,
      phone: req.body.phone,
      gender: req.body.gender,
      username: username,
      password: hashedPass,
      semester: 1,
      group: 0,
      role: "Student",
    });
    console.log(req.body);

    student
      .save()
      .then((student) => {
        studentController.postPayment(req, res, username);
        res.json({
          message: "User registered succesfully",
          username: username,
          password: req.body.password,
        });
      })
      .catch((err) => {
        res.json({
          message: "An error ocurred during registration",
        });
      });
  });
}

const registerAdmin = (req, res, next) => {
  bcrypt.hash(randomPassword, 10, (err, hashedPass) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    const admin = new User.Admin({
      name: req.body.name,
      username: req.body.username,
      password: hashedPass,
      role: "admin",
    });

    admin
      .save()
      .then((admin) => {
        res.json({
          message: "User registered succesfully",
        });
      })
      .catch((err) => {
        res.json({
          message: "An error ocurred during registration",
        });
      });
  });
};

async function registerGroup(req, res, next) {
  try {
    validateGroup(req.body);
    const group = new Group.Group({
      groupnumber: req.body.groupnumber,
      students: req.body.students,
    });

    group
      .save()
      .then((group) => {
        updateStudent(req, res);
      })
      .catch((err) => {
        res.json({
          message: "An error ocurred durin registration",
          status: 404,
        });
      });
  } catch (error) {
    res.json({
      status: 404,
    });
  }
}

async function updateStudent(req, res) {
  try {
    const student = await User.Student.updateOne(
      { username: req.body.students[0].Id },
      { group: req.body.groupnumber }
    );

    console.log(req.body.students[0].Id);
    // for (let i = 0; i < req.body.students.length; i++) {
    //   const student = await User.Student.updateOne(
    //     { username: req.body.students[i].username },
    //     { group: req.body.groupnumber }
    //   );
    // }
    res.json({
      message: "Group registered succesfully",
      status: 200,
    });
  } catch (error) {
    res.json({
      message: "An error ocurred during registration",
      status: 404,
    });
  }
}

function validateGroup(group) {
  const groupSchema = Joi.object({
    groupnumber: Joi.number().required(),
    students: Joi.array().required(),
  });

  return Joi.attempt(
    group,
    groupSchema,
    "All fields must be entered before posting"
  );
}

module.exports = {
  registerStudent,
  registerAdmin,
  registerGroup,
};
