import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
	title: {
		type: String,
		unique: true,
		immutable: true,
	},
});

const Topic = mongoose.model("Topic", topicSchema);
export default Topic;
