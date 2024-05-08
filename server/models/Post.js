import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  uploadFile: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createAt:{
	type: Date,
	immutable: true,
	default: ()=>{Date.now()}
	
  },
  createdBy: {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
      required: true,
    },
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  upvote: {
    type: Array,
    default: [],
  },
});
