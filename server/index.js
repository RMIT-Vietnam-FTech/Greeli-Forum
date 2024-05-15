import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";
import newsRoutes from "./routes/news.js";
import postRoutes from "./routes/post.js";
import threadRoutes from "./routes/thread.js";
import userRoutes from "./routes/user.js";
import topicRoutes from "./routes/topic.js";

import { app, io, server } from "./socket/socket.js";

/* CONFIGURATION */
const __dirname = path.resolve();

dotenv.config();
// const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(helmet.contentSecurityPolicy())
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
	origin: ["https://group-project-cosc3060-2024a-ftech.onrender.com"],
}));

app.use((req, res, next) => {
	res.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self' http://localhost:3001;");
	res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' https://cdnjs.cloudflare.com;");
	res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data:;");
	next();
})

app.use(express.static(path.join(__dirname, "/client/build")))

/*FILE STORAGE*/
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/assets");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});


const upload = multer({ storage });

app.get("/api", (req, res) => {
	res.status(201).json({ message: "hi there" });
});
app.use("/api/user", userRoutes);
app.use("/api/v1/threads", threadRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/topics", topicRoutes);
app.use("/api/v1/news", newsRoutes);
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})
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
