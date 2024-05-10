import express from "express";
import assert from "assert";
import userData from "../json/User.json" with { type: "json" } ;
const userRouter = express.Router();

userRouter.route("/")
.get( (req, res)=>{
    const object = [];
    for(let i = 0; i < userData.length; ++i){
        object.push({
            _id:userData[i]._id,
            username: userData[i].username,
            profileImage: userData[i].profileImage,
            isActivated: userData[i].isActivated
        });
    }
    res.json(object);
});
userRouter.route("/:userId")
.get( (req, res)=>{
    const userId = req.params.userId;
    for(let i = 0; i < userData.length; ++i){
        if(userId==userData[i]._id){

            res.json({
            _id:userData[i]._id,    
            username: userData[i].username,
            profileImage: userData[i].profileImage,
            isActivated: userData[i].isActivated
            });
        }
    }
})

userRouter.route("/:userId/setting")
.get((req, res)=>{
    const userId = req.params.userId;
    for(let i = 0; i < userData.length; ++i){
        if(userId==userData[i]._id){

            res.json({
                email:userData[i].email,
                phone:userData[i].phone,
                location:userData[i].location,
                gender:userData[i].gender,
            });
        }
    }
})
export default userRouter;