import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import multer from "multer";
import cookieParser from "cookie-parser";
import path from "path";

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
const __dirname = path.resolve();
// const app = express();
app.use(express.static("public"))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
    origin: ["https://group-project-cosc3060-2024a-ftech.onrender.com"], // Your client-side URL
    credentials: true
}));

app.use(express.static(path.join(__dirname, "/client/build")))
app.use(express.static(path.join(__dirname, "/server/public")))

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