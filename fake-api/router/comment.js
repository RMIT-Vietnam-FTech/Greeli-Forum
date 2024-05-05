import express from "express";
const commentRouter = express.Router();

commentRouter.route("/")
.get( (req, res)=>{

});

commentRouter.route("/:commentId")
.get( (req, res)=>{

})
export default commentRouter;