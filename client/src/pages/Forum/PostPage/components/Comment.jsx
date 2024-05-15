import axios from "axios";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useSwr from "swr";
import Avatar from "../../../../components/forum/Avatar";
import ButtonUpvote from "../../../../components/forum/ButtonUpvote";
import TextEditor from "../../../../components/forum/EditTextEditor/EditTextEditor";
import { EditContextProvider } from "../../../../context/EditContext";
import { ReplyContext } from "../../../../context/ReplyContext";
import ReplyButton from "./ReplyButton";
import ReplyEditor from "./ReplyEditor/ReplyEditor";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Comment({ commentData }) {
  const { postId } = useParams();
  const [newReply, setNewReply] = useState([]);
  const [isReply, setIsReply] = useState(false);
  // console.log("\ncheck Comment data: ");
  // console.log("content: "+commentData.content);
  // console.log("upvote: "+commentData.upvote);
  // console.log("replies: " + commentData.replies);
  // console.log("username: " + commentData.createBy.username);
  // console.log("profileImage: " + commentData.createBy.profileImage);
  const { data, error, isLoading } = useSwr(
    commentData.replies.length > 0
      ? `http://localhost:3001/api/v1/comments?postsId=${postId}&parentId=${commentData._id}`
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
      <ReplyContext.Provider
        value={{ newReply, setNewReply, isReply, setIsReply }}
      >
        <div className="my-4 position-relative">
          <div className="d-flex align-items-center gap-2">
            <Avatar src={commentData.createdBy.profileImage} />
            <p className="fw-bold">{commentData.createdBy.username}</p>
          </div>

          <div className="ms-5">
            <EditContextProvider>
              <TextEditor content={commentData.content} />
            </EditContextProvider>
            <ButtonUpvote upvote={commentData.upvote} />
            <EditContextProvider>
              <ReplyButton />
              {isReply ? <ReplyEditor /> : null}
            </EditContextProvider>
          </div>
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
      </ReplyContext.Provider>
    </>
  );
}
