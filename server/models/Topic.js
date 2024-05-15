import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    immutable: true,
  },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});

const Topic = mongoose.model("Topic", topicSchema);
export default Topic;
