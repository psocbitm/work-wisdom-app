const Post = require("../models/Post");

const getUserController = async (req, res, next) => {
  console.log("getUserController");
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

module.exports = getUserController;
