const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    groupnumber: Number,
    students: Array,
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = {
  Group,
};
