import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			min: 5,
			max: 20,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		createdPost: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
		}],
		archivedPost: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
		}],
		followThread: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Thread",
		}],
		isActivated: {
			type: Boolean,
			default: true,
		},
		profileImage: {
			type: String,
			
		}
	},
	{ timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
