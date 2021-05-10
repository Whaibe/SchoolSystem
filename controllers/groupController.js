const Group = require("../models/groups");

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

module.exports = {
  getGroups,
};
