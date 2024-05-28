import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import mongoose from "mongoose";
import { uploadFileData } from "../service/awsS3.js";
import * as crypto from "crypto";
import sharp from "sharp";
import { fileTypeFromBuffer } from "file-type";

const createRandomName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export const createComment = async (req, res) => {
  try {
    const { content, parentId, postId } = req.body;

    const uploadFile = req.file;

    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json({ message: "userId not found or invalid" });
    }

    if (!postId) {
      res.status(400).json({ message: "Bad Request" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: "postId is not found or invalid" });
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
    if (uploadFile) {
      commentObject.uploadFile = {
        src: null,
        type: null,
      };
      const imageName = createRandomName();
      const uploadFileMetaData = await fileTypeFromBuffer(uploadFile.buffer);
      const uploadFileMime = uploadFileMetaData.mime.split("/")[0];
      if (uploadFileMime === "image") {
        const fileBuffer = await sharp(uploadFile.buffer)
          .jpeg({ quality: 100 })
          .resize(1000)
          .toBuffer();
        await uploadFileData(fileBuffer, imageName, uploadFile.mimetype);
        commentObject.uploadFile.type = "image";
      } else {
        await uploadFileData(uploadFile.buffer, imageName, uploadFile.mimetype);
        commentObject.uploadFile.type = "video";
      }
      commentObject.uploadFile.src = `https://d46o92zk7g554.cloudfront.net/${imageName}`;
    }

    const comment = new Comment(commentObject);
    console.log("check 9");

    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      if (!parentComment) {
        res.status(404).json("parenId comment is not found or invalid");
      }

      comment.parentId = parentComment._id;

      parentComment.replies.push(comment._id);
      await parentComment.save();
    }

    post.comments.push(comment._id);
    await post.save();
    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const uploadCommentFile = async (req, res) => {
  try {
    res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export const getComments = async (req, res) => {
  try {
    let { postId, parentId, page, limit } = req.query;
    console
      .log
      //   `check iput:\n postId: ${postId}\n parentId: ${parentId}\n check TypeOf:\n postId type: ${typeof postId}\n parenId type: ${typeof parentId}`
      ();
    if (!page) {
      page = "1";
    }
    if (!limit) {
      limit = "20";
    }
    const queryCommand = {};

    if (parentId) {
      if (parentId !== "null") {
        queryCommand.parentId = new mongoose.Types.ObjectId(parentId);
      } else {
        queryCommand.parentId = null;
      }
    }

    if (postId !== "null" && postId) {
      const post = await Post.findById(postId);
      if (!post) {
        res.status(400).json("postId is not found or invalid");
      }
      queryCommand._id = { $in: post.comments };
    }
    const comments = await Comment.aggregate([{ $match: queryCommand }]).facet({
      metadata: [
        {
          $project: {
            _id: 1,
          },
        },
        { $count: "total" },
        {
          $addFields: {
            page: parseInt(page),
            limit: parseInt(limit),
          },
        },
      ],

      data: [
        {
          $sort: {
            createdAt: -1,
          },
        },
        { $skip: (Number.parseInt(page) - 1) * limit },
        { $limit: Number.parseInt(limit) },
      ],
    });

    if (!comments) return res.status(400).json("cannot found items");
    res.status(200).json({
      metadata: comments[0].metadata[0],
      data: comments[0].data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postUpVote = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    if (!commentId) return res.status(400).json("Bad Request");

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(400).json("post id not found or invalid");

    comment.upvote.push(req.user.id);
    await comment.save();
    res.status(204).json("Success");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteUpvote = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    if (!commentId) return res.status(400).json("Bad Request");

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(400).json("post id not found or invalid");

    comment.upvote.remove(req.user.id);
    await comment.save();
    res.status(204).json("Success");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
