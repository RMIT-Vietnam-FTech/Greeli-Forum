import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
export const createComment = async (req, res) => {
  try {
    const { content, parentId, postId } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json("userId not found or invalid");
    }
    if (postId=="null") {
      res.status(400).json("Bad Request");
    }
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json("postId is not found or invalid");
    }
    const commentObject = {
      content: content,
      createdBy: {
        userId: user._id,
        username: user.username,
      },
    };
    if (user.profileImage) {
      commentObject.createdBy.profileImage = user.profileImage;
    }

    const comment = new Comment(commentObject);

    if (parentId!=="null") {
      const parentComment = await Comment.findById(parentId);
      if (!parentComment) {
        res.status(404).json("parenId comment is not found or invalid");
      }
      parentComment.replies.push(comment._id);
      await parentComment.save();

      comment.parentId = parentId;
    }

    post.comments.push(comment._id);
    await post.save();

    await comment.save();

    res.status(204).json("create success!");
    res.location(`localhost:3001/api/v1/comments/${comment._id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId, parentId } = req.query;
	// console.log(`check iput:\n postId: ${postId}\n parentId: ${parentId}`)
    const queryCommand = {};

    if (!parentId=="null") {
      queryCommand.parentId = parentId;
    } else {
      queryCommand.parentId = null;
    }

    if (postId) {
      const post = await Post.findById(postId);
      if (!post) {
        res.status(404).json("postId is not found or invalid");
      }
      queryCommand._id = { $in: post.comments };
    } 

    const comments = await Comment.find(queryCommand);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
