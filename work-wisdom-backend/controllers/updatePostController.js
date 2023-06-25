const Post = require("../models/Post");

const updatePostController = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;

    // Find the post by ID
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the authenticated user is the author of the post
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized to update this post" });
    }

    // Update the post
    post.title = title || post.title;
    post.content = content || post.content;

    // Save the updated post
    await Post.findByIdAndUpdate(postId, post);

    res.json(post);
  } catch (error) {
    next(error);
  }
};

module.exports = updatePostController;
