const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    groupnumber: Number,
    students: Array,
    teacherUsername: String,
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = {
  Group,
};
