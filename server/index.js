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
import threadRoutes from "./routes/thread.js";
import userRoutes from "./routes/user.js";

import { app, io, server } from "./socket/socket.js";

/* CONFIGURATION */
dotenv.config();
// const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

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
app.use("/api/thread", threadRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/news", newsRoutes);

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
