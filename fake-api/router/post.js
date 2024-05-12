import express from "express";
const postRouter = express.Router();
import postData from "../json/Post.json" with {type: "json"};
postRouter.route("/")
.get( (req, res)=>{
    res.json(postData);
});

postRouter.route("/:postId")
.get( (req, res)=>{
    const postId = req.params.postId;
    for( let i =0 ; i < postData.length; ++i){
        if(postData[i]._id==postId){
            res.json(postData[i]);
        }
    }
})
export default postRouter;