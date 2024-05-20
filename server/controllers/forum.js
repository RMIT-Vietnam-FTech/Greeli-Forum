import User from "../models/User.js";
import Thread from "../models/Thread.js";
import Post from "../models/Post.js";

export const getForumStatistic = async (req, res) => {
  try {
    const threadCount = await Thread.find({}, {}).countDocuments();
    const userCount = await User.find({}, {}).countDocuments();
    const postCount = await Post.find({}, {}).countDocuments();
    res.status(200).json({
      thread: threadCount,
      user: userCount,
      post: postCount,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getForumLeadboard = async (req, res) => {
  try {
    const leaderboardRanking = await User.aggregate([
      {
        $match: {},
      },
      {
        $addFields: {
          nOfCreatedPosts: { $size: "$createdPost" },
        },
      },

      {
        $sort: {
          nOfCreatedPosts: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          username: 1,
          profileImage: 1,
          nOfCreatedPosts: 1,
        },
      },
    ]);
    res.status(200).json(leaderboardRanking);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
