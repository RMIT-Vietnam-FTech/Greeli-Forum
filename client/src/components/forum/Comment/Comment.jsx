import axios from "axios";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Avatar from "../Avatar";
import TextEditor from "../TextEditor/TextEditor";
import DropDown from "../DropDown";
import AuthComponent from "../AuthComponent";
import ButtonUpvote from "../../ButtonUpvote";
import Reply from "./Reply";
import ReplyContext from "../../../contexts/ReplyContext";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Comment({ commentData }) {
  const { postId } = useParams();
  const [newReply, setNewReply] = useState([]);
  const [isReply, setIsReply] =useState(false);
  // console.log("\ncheck Comment data: ");
  // console.log("content: "+commentData.content);
  // console.log("upvote: "+commentData.upvote);
  // console.log("replies: " + commentData.replies);
  // console.log("username: " + commentData.createBy.username);
  // console.log("profileImage: " + commentData.createBy.profileImage);
  const { data, error, isLoading } = useSWR(
    commentData.replies.length > 0
      ? "http://localhost:9000/api/v1/comments?postsId=" +
          postId +
          "&parentId=" +
          commentData._id
      : null,
    fetcher
  );
  if (error) {
    return "error";
  }
  if (isLoading) {
    return "is loading";
  }
  return (
    <>
      <div className="my-4 position-relative">
        <ReplyContext.Provider value={{isReply, setIsReply, newReply, setNewReply}}>
        <AuthComponent
          componentType={"comments"}
          unAuthorizedProcess={true}
          objectId={commentData._id}
        >
          <DropDown />

          <div className="d-flex align-items-center gap-2">
            <Avatar src={commentData.createBy.profileImage} />
            <p className="fw-bold">{commentData.createBy.username}</p>
          </div>

          <div className="ms-5">
            <TextEditor content={commentData.content} />
            <ButtonUpvote upvote={commentData.upvote} />
            <Reply />
          </div>
        </AuthComponent>
        </ReplyContext.Provider>
        <div className="ms-5">
          {newReply}
          {data
            ? data.map((commentData) => {
                return (
                  <Comment key={commentData._id} commentData={commentData} />
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}
