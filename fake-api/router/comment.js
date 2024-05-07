import express from "express";
import axios from "axios";
const commentRouter = express.Router();
import commendData from "../json/Comment.json" with {type: "json"};
commentRouter.route("/")
.get( async (req, res)=>{
    const postId = req.query.postId;
    let parentId = req.query.parentId;
    if(parentId=="null"){
        parentId = null;
    }
    let result = commendData;
    if(postId){
        const response = await axios.get("http://localhost:9000/api/v1/posts/"+postId);
        const comments = response.data.comments;
        result = result.filter((comment)=>{
            return comments.includes(comment._id);
        });
    }
    if(parentId==null){
        console.log(result[1]._id)
        result = result.filter((comment)=>{
            return comment.parentId == parentId;
        });
    }
    //console.log("comment by postId("+postId+"): "+ result);
    res.json(result);
});

commentRouter.route("/:commentId")
.get( (req, res)=>{
    const commentId = req.params.commentId;
    for(let i = 0; i < commendData.length; ++i){
        if(commentId == commendData[i]._id){
            res.json(commendData[i]);
        }
    }
})
commentRouter.route("/:commentId/replies")
.get(async (req, res)=>{
        let result = commendData;
        const response = await axios.get("http://localhost:9000/api/v1/comments/"+req.params.commentId);
        const replies = response.data.replies;
        result = result.filter((comment)=>{
            return replies.includes(comment._id);
        })
        res.json(result);

});
export default commentRouter;