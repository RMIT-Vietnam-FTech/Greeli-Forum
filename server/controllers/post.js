import * as crypto from "crypto";
import Post from "../models/Post.js";
import Thread from "../models/Thread.js";
import User from "../models/User.js";
import { deleteFileData, uploadFileData } from "../service/awsS3.js";
import { ObjectId } from "mongodb";

const createRandomName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export const createPost = async (req, res) => {
  //req.body -> title, content, createBy{}
  try {
    const title = req.body.title;
    const content = req.body.content;
    const uploadFile = req.file;
    const belongToThread = req.body.belongToThread;
    const user = req.user;
    // console.log(
    //   `title: ${title}\n content: ${content}\n uploadFile: ${uploadFile}\n parentThread: ${belongToThread}\n user: ${user}`
    // );
    if (req.user) {
      const user = await User.findById(req.user.id);
      // console.log(user);
      const uploadObject = {};
      uploadObject.title = title;
      uploadObject.content = content;
      uploadObject.createdBy = {
        userId: user._id,
        username: user.username,
      };

      if (user.profileImage) {
        uploadObject.createdBy.profileImage = user.profileImage;
      }
      const thread = await Thread.findById(belongToThread);

      //   console.log(`check thread: ${thread}`);
      if (thread) {
        uploadObject.belongToThread = belongToThread;
      } else {
        res.status(404).json("thread id is not found or invalid");
      }

      if (uploadFile) {
        const imageName = createRandomName();
        await uploadFileData(uploadFile.buffer, imageName, uploadFile.mimetype);
        uploadObject.uploadFile = `https://d46o92zk7g554.cloudfront.net/${imageName}`;
      }

      const post = new Post(uploadObject);
      await post.save();

      user.createdPost.push(post._id);
      await user.save();

      thread.posts.push(post._id);
      await thread.save();

      res.status(201).json(post._id);
    } else {
      res.status(403).json("Unauthorized");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  //pagination
  try {
    //filter -> threadId
    //sorting
    let { sort, belongToThread, page, limit } = req.query;
    if (!page) {
      page = "1";
    }
    if (!limit) {
      limit = "20";
    }
    let sortObject = { time: 1 };
    if (sort === "hot") {
      sortObject = { time: 1 };
    }
    if (sort === "new") {
      sortObject = { createdAt: 1 };
    }
    if (sort === "top") {
      sortObject = { upvoteLength: 1 };
    }
    const filter = {};
    if (belongToThread) {
      filter.belongToThread = new ObjectId(belongToThread);
    }
    //sorting ( on upvote length, on createTime, trendy -> (upvote + comment)/(now-createTime))
    const posts = await Post.aggregate().facet({
      metadata: [
        { $count: "total" },
        {
          $addFields: {
            page: parseInt(page),
            limit: parseInt(limit),
          },
        },
      ],
      data: [
        { $match: filter },
        {
          $addFields: {
            upvoteLength: { $size: "$upvote" },
            commentLength: { $size: "$comments" },
            time: {
              $divide: [
                {
                  $add: [{ $size: "$upvote" }, { $size: "$comments" }],
                },
                {
                  $add: [
                    {
                      $dateDiff: {
                        startDate: new Date(),
                        endDate: "$createdAt",
                        unit: "second",
                      },
                    },
                    10,
                  ],
                },
              ],
            },
          },
        },
        { $sort: sortObject },
        { $skip: (page - 1) * limit },
        { $limit: Number.parseInt(limit) },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const modifyPost = async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.postId;
    // console.log(postId);
    const user = req.user;
    const post = await Post.findById(postId);
    // console.log(post);
    if (post) {
      if (post.createdBy.userId === user.id) {
        post.content = content;
        post.save();
        res.status(204).json("success");
      } else {
        res.status(401).json("Unauthorized");
      }
    } else {
      res.status(404).json("Not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { threadId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("userId is not found or invalid");
    if (!threadId) return res.status(400).json("Bad Request");
    const post = await Post.findById(postId);
    const thread = await Thread.findById(threadId);
    if (!thread) return res.status(404).json("threadId not found or invalid");
    if (!post) return res.status(404).json("postId not found or invalid");
    if (post.createdBy.userId !== req.user.id)
      return res.status(403).json("Forbidden");
    console.log("check post data: "+ JSON.stringify(post.comments));
    // delete in s3 bucket
    if (post.uploadFile) {
      deleteFileData(post.uploadFile);
    }

    //delete related reference
    user.createdPost.remove(post._id);
    
    await user.save();

    thread.posts.remove(post._id);
    await thread.save();

    if(post.comments.length > 0){
    await Comment.deleteMany({ _id: { $in: post.comments } });
    }

    //delete post
    await Post.deleteOne({ _id: post._id });

    res.status(204).json("success");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAllPost = async (req, res) => {
  try {
    await Post.deleteMany({});
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
