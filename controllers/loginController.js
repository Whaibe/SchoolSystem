const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "admin") {
    findUser(username, password, res);
  } else if (username === "p1") {
    findTeacher(username, password, res);
  } else {
    findStudent(username, password, res);
  }
};

async function findUser(username, password, res) {
  const user = await User.Admin.findOne({
    $or: [{ username: username }],
  });
  console.log("logged as admin");
  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.render("../views/login.ejs", {
          error: 3,
        });
      }
      if (result) {
        const token = jwt.sign({ name: user.name }, "verySecret", {
          expiresIn: "1hr",
        });
        res.render("../views/adminGroupsMain.ejs", {
          token: token,
        });
      } else {
        res.render("../views/login.ejs", {
          error: 1,
        });
      }
    });
  } else {
    res.render("../views/login.ejs", {
      error: 1,
    });
  }
}

async function findStudent(username, password, res) {
  const user = await User.Student.findOne({
    $or: [{ username: username }],
  });
  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.render("../views/login.ejs", {
          error: 3,
        });
      }
      if (result) {
        const token = jwt.sign({ name: user.name }, "verySecret", {
          expiresIn: "1hr",
        });
        res.render("../views/studentMain.ejs", {
          token: token,
        });
      } else {
        res.render("../views/login.ejs", {
          error: 1,
        });
      }
    });
  } else {
    res.render("../views/login.ejs", {
      error: 1,
    });
  }
}

async function findTeacher(username, password, res) {
  const user = await User.Teacher.findOne({
    $or: [{ username: username }],
  });
  console.log("logged as Teacher");

  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.render("../views/login.ejs", {
          error: 3,
        });
      }
      if (result) {
        const token = jwt.sign({ name: user.name }, "verySecret", {
          expiresIn: "1hr",
        });
        res.render("../views/teacherGroups.ejs", {
          token: token,
        });
      } else {
        res.render("../views/login.ejs", {
          error: 1,
        });
      }
    });
  } else {
    res.render("../views/login.ejs", {
      error: 1,
    });
  }
}

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(`Got token ${token}`);
    const decode = jwt.verify(token, "verySecret");
    req.user = decode;
    next();
  } catch (error) {
    console.log("Didnt autenticate");
    res.json({
      message: "Need to authenticate first",
    });
  }
};

module.exports = {
  login,
  authenticate,
};
