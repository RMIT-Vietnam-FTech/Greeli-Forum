import { useParams } from "react-router-dom";
export default function PostPage(){
    const {postId} = useParams();
    console.log("check post id: "+ postId);
}