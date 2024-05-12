import express from "express";
import threadData from "../json/Thread.json" with {type: "json"};
const threadRouter = express.Router();
threadRouter.route("/")
.get( (req, res)=>{
    const object = [];
    for(let i =0; i < threadData.length; ++i){
        object.push(
            {
                _id: threadData[i]._id,
                title: threadData[i].title,
                content: threadData[i].content,
                uploadFile: threadData[i].uploadFile,
                createDate:threadData[i].createDate,
                createBy:{
                    username: threadData[i].createBy.username,
                    profileImage: threadData[i].createBy.profileImage
                } ,
                posts: threadData[i].posts
            }
        );
    }
        res.json(object);
});

threadRouter.route("/:threadId")
.get( (req, res)=>{
    const threadId = req.params.threadId;
    for(let i =0; i < threadData.length; ++i){
        if(threadId==threadData[i]._id){
            res.json(
                {
                  _id: threadData[i]._id,
                  title: threadData[i].title,
                  content: threadData[i].content,
                  uploadFile: threadData[i].uploadFile,
                  createDate:threadData[i].createDate,
                  createBy:{
                      username: threadData[i].createBy.username,
                      profileImage: threadData[i].createBy.profileImage
                  } ,
                  posts: threadData[i].posts
                }
        );
        }
        
    } 
})

threadRouter.route("/:threadId/rule")
.get((req, res)=>{

})
export default threadRouter;