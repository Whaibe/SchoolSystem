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
  console.log("vava" + username);
  try {
    const student = await User.Student.find({ username: username });
    await console.log(student);

    const number = student[0].group;
    await Group.Group.updateMany({}, { $pull: { students: { Id: username } } });
  } catch (error) {
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
