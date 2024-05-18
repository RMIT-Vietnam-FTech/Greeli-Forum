import mongoose from "mongoose";

const threadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      immutable: true,
      required: true,
    },
    content: {
      type: String,
      required: false,
      default: null,
    },
    uploadFile: {
      type: String,
      required: false,
      default: null,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    rule: [
      {
        title: String,
        description: String,
      },
    ],
    createdBy: {
      userId: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      profileImage: {
        type: String,
        required: false,
        default: null,
      },
    },
    followedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Thread = mongoose.model("Thread", threadSchema);
export default Thread;
