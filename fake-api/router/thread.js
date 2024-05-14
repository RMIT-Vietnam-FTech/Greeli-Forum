import express from "express";
import threadData from "../json/Thread.json" with {type: "json"};
const threadRouter = express.Router();
threadRouter.route("/")
.get( (req, res)=>{
    const object = [];
    for(let i =0; i < threadData.length; ++i){
        object.push(
            threadData[i]
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
             threadData[i] 
        );
        }
        
    } 
})

threadRouter.route("/:threadId/rule")
.get((req, res)=>{

})
export default threadRouter;