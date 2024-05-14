import express from "express";
import userRouter from "./router/user.js";
import threadRouter from "./router/thread.js";
import commentRouter from "./router/comment.js";
import cors from "cors";
import postRouter from "./router/post.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/users", userRouter);
app.use("/api/v1/threads", threadRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.get("/", (req, res)=>{
    res.json("welcome to server");
})

app.listen(9000);