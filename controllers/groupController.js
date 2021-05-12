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
  console.log(username);

  try {
    const student = await User.Student.find({ username: username });
    const number = student[0].group;
    await Group.Group.updateMany(
      { groupnumber: number },
      { $pull: { students: { Id: username } } },
      { safe: true, multi: true }
    ).exec();
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
