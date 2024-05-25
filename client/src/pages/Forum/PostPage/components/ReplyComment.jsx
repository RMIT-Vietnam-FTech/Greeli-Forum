import axios from "axios";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

import ButtonUpvote from "../../../../components/Forum/ButtonUpvote";
import { EditContextProvider } from "../../../../context/EditContext";
import { ReplyContext } from "../../../../context/ReplyContext";

import ReplyButton from "./ReplyButton";
import ReplyEditor from "./ReplyEditor/ReplyEditor";
import EditTextEditor from "../../../../components/Forum/EditTextEditor/EditTextEditor";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const fetcher = (url) => axios.get(url).then((res) => {
  console.log(res.data);
  return (res.data);
});

export default function ReplyComment({ commentData, isLastIndex, isNew }) {
  const { postId } = useParams();
  const [newReply, setNewReply] = useState([]);
  const [isReply, setIsReply] = useState(false);
  // console.log("\ncheck Comment data: ");
  // console.log("content: "+commentData.content);
  // console.log("upvote: "+commentData.upvote);
  // console.log("replies: " + commentData.replies);
  // console.log("username: " + commentData.createBy.username);
  // console.log("profileImage: " + commentData.createBy.profileImage);
  const { data, error, isLoading } = useSWRImmutable(
    commentData.replies.length > 0
      ? `http://localhost:3001/api/v1/comments?postsId=${postId}&parentId=${commentData._id}`
      : null,
    fetcher,
  );
  if (error) {
    return "error";
  }
  if (isLoading) {
    return "is loading";
  }

  // const reply = data
  //   ? data.map((commentData, index, data) => {
  //       return (
  //         <ReplyComment
  //           key={commentData._id}
  //           commentData={commentData}
  //           isLastIndex={index === data.length - 1}
  //         />
  //       );
  //     })
  //   : [];
    console.log(`check input: isLastIndex: ${isLastIndex}`)
  return (
    <>
      <ReplyContext.Provider
        value={{ newReply, setNewReply, isReply, setIsReply }}
      >
        <div
          tabIndex="0"
          aria-label="comment section"
          className="my-4 position-relative"
        >
          {commentData.parentId !== null && (
            <div
              className="bg-login-subtle opacity-25 position-absolute"
              style={{
                width: "30px",
                height: "1px",
                top: "19px",
                left: "-12px",
              }}
            ></div>
          )}
          {(commentData.replies.length > 0 || newReply.length > 0) && (
            <div
              className="bg-login-subtle h-100 opacity-25 position-absolute"
              style={{ width: "1px", top: "5px", left: "10px" }}
            ></div>
          )}
          {(isLastIndex || isNew) && (
            <div
              className="bg-greeli-subtle h-100 position-absolute z-1"
              style={{
                width: "5px",
                top: "20px",
                left: "-13px",
              }}
            ></div>
          )}
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
              <EditTextEditor content={JSON.parse(commentData.content)} />
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
          <div style={{ marginLeft: "23px" }}>
            {newReply}
            {/* {reply} */}
          </div>
        </div>
      </ReplyContext.Provider>
    </>
  );
}
