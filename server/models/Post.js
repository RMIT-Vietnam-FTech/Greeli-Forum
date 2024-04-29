import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        postImage: {
            type: String,
            required: true,
        },
        createdBy: {
            username: {
                type: String,
                required: true,
            },
            userImage: {
                type: String,
                required: true,
            }
        },
        isApproved: {
            type: Boolean,
            default: false,
        },
        upvote: {
            type: Array,
            default: [],
        }
    }
)