const Group = require("../models/groups");
const User = require("../models/user");

async function getGroups(req, res, next) {
  try {
    const groups = await Group.Group.find({});
    res.json({
      groups: groups,
      status: 200,
    });
  } catch (error) {
    res.json({
      status: 404,
    });
  }
}

async function updateGroups(req, res, username) {
  try {
    const student = await User.Student.find({ username: username });
    const number = student[0].group;

    const group = await Group.Group.find({ groupnumber: number });

    for (let i = 0; i < group[0].students.length; i++) {
      if (group[0].students[i].Id == username) {
        var item = group[0].students.splice(i, 1);
        console.log(item);
        console.log(group[0].students);
      }
    }
    await group[0].save();
  } catch (error) {
    console.log(error);
    res.json({
      message: "An error ocurred during student deletion",
      status: 404,
    });
  }
}

module.exports = {
  getGroups,
  updateGroups,
};
