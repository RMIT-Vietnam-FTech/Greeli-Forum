import { contentSecurityPolicy } from "helmet";
import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		createdBy: {
			username: {
				type: String,
				required: true,
			},
		},
		content: {
			type: String,
			required: true,
		},
		date: {
     		type: Date,
      		default: Date.now,
    	},
		image: {
			type: String,
			required: true,
		}
	},
	{ timestamps: true },
);

const News = mongoose.model("News", newsSchema);
export default News;
