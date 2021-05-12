const Group = require("../models/groups");

async function getGroups(req, res, next) {
  try {
    const username = req.params.username;
    const groups = await Group.Group.find({ teacherUsername: username }).catch(
      (err) => {
        res.json({
          status: 404,
        });
      }
    );
    res.json({
      status: 200,
      groups: groups,
    });
  } catch (error) {
    res.json({
      status: 404,
    });
  }
}

module.exports = {
  getGroups,
};
