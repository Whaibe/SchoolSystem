const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: String,
    lastname: String,
    major: String,
    CURP: String,
    address: String,
    phone: String,
    gender: String,
    username: Number,
    password: String,
    semester: Number,
    role: String,
    group: Number,
    classes: Array,
  },
  { timestamps: true }
);

const adminSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  role: String,
});

const Admin = mongoose.model("Admin", adminSchema);
const Student = mongoose.model("Student", studentSchema);

module.exports = {
  Student,
  Admin,
};
