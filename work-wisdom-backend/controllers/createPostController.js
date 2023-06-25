const Post = require("../models/Post");

const createPostController = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const author = req.user._id;

    const newPost = new Post({
      title,
      content,
      author,
    });

    const savedPost = await newPost.save();
    //save the post to the user's posts array
    req.user.posts.push(savedPost._id);
    await req.user.save();
    res.json(savedPost);
  } catch (error) {
    next(error);
  }
};

module.exports = createPostController;
