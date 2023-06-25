const Post = require("../models/Post");

const getAllPostsController = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name email");
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllPostsController;
