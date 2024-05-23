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
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

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
        <div tabIndex="0" aria-label="comment section" className="my-4 position-relative">
          <div className="d-flex align-items-center gap-1">
            {/* avatar */}
            <div
              className="rounded-circle overflow-hidden bg-secondary"
              style={{ width: "30px", height: "30px" }}
            >
              {commentData.createdBy.profileImage ? (
                <img
                  alt={commentData.createdBy.username}
                  className="w-100 h-100"
                  src={commentData.createdBy.profileImage}
                />
              ) : null}
            </div>

            {/* username */}
            <p
            tabIndex="0"
              className="fw-bold m-0 text-login-emphasis"
              style={{ fontSize: "14px" }}
            >
              {commentData.createdBy.username}
            </p>
            <li className="text-greeli-emphasis" style={{ fontSize: "12px" }}>
              {dayjs().to(dayjs(commentData.createdAt))}
            </li>
          </div>

          {/*content*/}
          <div className="ms-4">
            <EditContextProvider>
              <TextEditor content={JSON.parse(commentData.content)} />
            </EditContextProvider>

            {/*upvote*/}
            <ButtonUpvote
              upvote={commentData.upvote}
              commentId={commentData._id}
            />

            {/*reply*/}
            <EditContextProvider>
              <ReplyButton nOfReply={commentData.replies.length} />
              {isReply ? <ReplyEditor parentId={commentData._id} /> : null}
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
