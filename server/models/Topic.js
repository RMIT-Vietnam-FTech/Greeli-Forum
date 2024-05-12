import mongoose from "mongoose";

const topicSchem = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	threads: [
		{
			type: String,
		},
	],
});

const Thread = mongoose.model("Thread", threadSchema);
export default Thread;
