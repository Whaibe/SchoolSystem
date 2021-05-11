const User = require("../models/user");
const Payment = require("../models/payment");

async function getStudent(req, res, next) {
  try {
    const student = await User.Student.find({ $or: [{ group: 0 }] });
    res.json({
      students: student,
      status: 200,
    });
  } catch (error) {
    res.json({
      status: 404,
    });
  }
}
async function getStudentByName(req, res, next) {
  const username = req.params.username;
  console.log(username);
  try {
    const student = await User.Student.find({
      $or: [{ username: username }],
    });
    res.json({
      students: student,
      status: 200,
    });
  } catch (error) {
    res.json({
      status: 404,
    });
  }
}
async function postPayment(req, res, username) {
  console.log(username);
  var id;
  const lastPayment = await Payment.Payment.find({
    $or: [{ username: username }],
  })
    .sort({ $natural: -1 })
    .limit(1);
  if (lastPayment.length == 0) {
    id = 1;
  } else {
    id = lastPayment[0].id + 1;
  }

  const inscription = new Payment.Payment({
    username: username,
    value: 25000,
    concept: "Inscripcion",
    date: "2021-05-25",
    status: "Pendiente",
    id: id,
  });
  const colegiatura = new Payment.Payment({
    username: username,
    value: 9000,
    concept: "Colegiatura",
    date: "2021-07-25",
    status: "Pendiente",
    id: id,
  });
  console.log(inscription);
  try {
    inscription.save().catch((err) => {
      res.json({
        message: "An error ocurred during payment registration",
      });
    });
    colegiatura.save().catch((err) => {
      console.log(err);

      res.json({
        message: "An error ocurred during payment registration",
      });
    });
  } catch (error) {
    res.json({
      status: 404,
    });
  }
}

async function getPayments(req, res, next) {
  try {
    const payments = await Payment.Payment.find({
      $or: [{ username: req.params.username }],
    });
    if (payments.length > 0) {
      res.json({
        payments: payments,
        status: 200,
      });
    } else {
      res.json({
        message: `There are no payments for username: ${username}`,
        status: 300,
      });
    }
  } catch (error) {
    res.json({
      message: "An error ocurred retrieving payments",
      status: 404,
    });
  }
}

async function postClasses(req, res, username) {
  console.log(username);
  const classes = [
    {
      nombre: "Matematicas",
    },
    {
      nombre: "Historia",
    },
    {
      nombre: "Civica y Etica",
    },
    {
      nombre: "Español",
    },
  ];
  try {
    const student = await User.Student.updateOne(
      { username: username },
      { classes: classes }
    ).catch((err) => {
      res.json({
        message: "An error ocurred during classes registration",
      });
    });
  } catch (error) {
    res.json({
      status: 404,
    });
  }
}

async function getClasses(req, res, next) {
  try {
    const student = await User.Student.find({
      $or: [{ username: req.params.username }],
    });
    const classes = student[0].classes;

    if (classes.length > 0) {
      res.json({
        classes: classes,
        status: 200,
      });
    } else {
      res.json({
        message: `There are no payments for username: ${username}`,
        status: 300,
      });
    }
  } catch (error) {
    res.json({
      message: "An error ocurred retrieving payments",
      status: 404,
    });
  }
}

module.exports = {
  getStudent,
  getStudentByName,
  postPayment,
  getPayments,
  postClasses,
  getClasses,
};
