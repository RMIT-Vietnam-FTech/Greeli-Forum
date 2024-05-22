import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import multer from "multer";

import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";
import newsRoutes from "./routes/news.js";
import postRoutes from "./routes/post.js";
import adminPostRoutes from "./routes/adminPost.js";
import threadRoutes from "./routes/thread.js";
import userRoutes from "./routes/user.js";
import topicRoutes from "./routes/topic.js";
import feedbackRoutes from "./routes/feedback.js"
import forumRoutes from "./routes/forum.js";
import commentRoutes from "./routes/comment.js";
import { app, io, server } from "./socket/socket.js";
import User from "./models/User.js";

/* CONFIGURATION */
dotenv.config();
// const app = express();
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/*FILE STORAGE*/
// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "./public/image/avatar");
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, `${Date.now()}_${file.originalname}`);
// 	},
// });

// const fileFilter = (req, file, cb) => {
// 	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
// 		cb(null, true);
// 	} else {
// 		cb(null, false);
// 		cb(new Error("Only .jpeg or .png files are allowed!"), false);
// 	}
// }

// const upload = multer({storage: storage, fileFilter: fileFilter});

app.get("/api", (req, res) => {
	res.status(201).json({ message: "hi there" });
});
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/admin/posts", adminPostRoutes);
app.use("/api/v1/threads", threadRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/forums", forumRoutes);
app.use("/api/v1/topics", topicRoutes);
app.use("/api/v1/news", newsRoutes);
app.use("/api/feedback", feedbackRoutes)
// app.post("/api/upload/:userId", upload.single("image"), async (req, res) => {
// 	try {
// 		const userId = req.params.userId;
// 		const user = await User.findByIdAndUpdate(userId, { profileImage: `/image/avatar/${req.file.filename}`});
// 		res.status(201).json('File uploaded succesfully!');
// 	} catch (error) {
// 		res.status(500).json(error)
// 		console.log(error)
// 	}
// })
/* CONNECT DATABASE AND RUN SERVER */
const PORT = process.env.PORT || 8001;
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		server.listen(PORT, () => {
			console.log(`SERVER IS RUNNING ON ${PORT}`);
		});
	})
	.catch((error) => console.log(`${error}. SERVER IS NOT CONNECTING`));
