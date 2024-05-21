import axios from "axios";
import { useContext, useEffect, useInsertionEffect, useState } from "react";

import useSwr from "swr";
import { Button } from "react-bootstrap";
import { CommentContext } from "../../../context/CommentContext";
import { EditContextProvider } from "../../../context/EditContext";
import Comment from "./components/Comment";
import CreateCommentEditor from "./components/CreateCommentEditor/CreateCommentEditor";
import ButtonUpvote from "../../../components/forum/ButtonUpvote";

import { FaCommentAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { BsShieldFillX } from "react-icons/bs";
import { BsShieldFillCheck } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import LoginPopup, { useLogin } from "../../../components/Popup/LoginPopup";
import {
  PopupContext,
  PopupContextProvider,
} from "../../../context/PopupContext";

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function Comments({ postData, threadAdminId }) {
  const isLogin = useLogin();
  const [newComment, setNewComment] = useState([]);
  const [isApproved, setIsApproved] = useState(postData.isApproved);
  const navigate = useNavigate();

  async function handleApproved() {
    setIsApproved(true);
    const path = `http://localhost:3001/api/v1/admin/posts/${postData._id}`;
    await axios.put(
      path,
      { threadId: postData.belongToThread },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      }
    );
  }

  async function handleUnApproved() {
    try {
      //delete and redirect
      const path = `http://localhost:3001/api/v1/posts/${postData._id}`;
      await axios.delete(
        path,

				{
					data: {
						threadId: postData.belongToThread,
					},
					headers: {
						Authorization: `Bearer ${
							JSON.parse(localStorage.getItem("user")).token
						}`,
					},
				},
			);

      navigate(`/forum/${postData.belongToThread}`);
    } catch (error) {
      console.error(error.message);
    }
  }
  const { data, error, isLoading } = useSwr(
    `http://localhost:3001/api/v1/comments?postId=${postData._id}&parentId=null`,
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          <ButtonUpvote upvote={postData.upvote} postId={postData._id} />
          <ButtonComment commentLength={postData.comments.length} />
        </div>

        {/*show verify status */}
        {isLogin &&
        threadAdminId === JSON.parse(localStorage.getItem("user")).id &&
        !isApproved ? (
          <div className="d-flex gap-2 me-2">
            <Button
              onClick={handleApproved}
              className="border-greeli rounded-circle bg-transparent text-error-emphasis"
            >
              <IoMdCheckmark />
            </Button>

            <Button
              onClick={handleUnApproved}
              className="border-greeli rounded-circle bg-transparent text-error-emphasis"
            >
              <IoMdClose />
            </Button>
          </div>
        ) : (
          <>
            {isLogin &&
            postData.createdBy.userId ===
              JSON.parse(localStorage.getItem("user")).id ? (
              <div className="d-flex align-items-center">
                <p
                  className={`text-error-emphasis p-0 m-0 ${
                    isApproved ? null : "opacity-25"
                  }`}
                >
                  {isApproved ? "Approved" : "Unapproved"}
                </p>
                <div className="ms-3 fs-4">
                  {isApproved ? (
                    <BsShieldFillCheck className="text-success" />
                  ) : (
                    <BsShieldFillX className="text-danger" />
                  )}
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
      <CommentContext.Provider value={{ newComment, setNewComment }}>
        <EditContextProvider>
          <CreateCommentEditor />
        </EditContextProvider>
        <section id="comment-section" className="mt-3 w-100">
          {newComment}
          {data.map((commentData) => {
            return <Comment key={commentData._id} commentData={commentData} />;
          })}
        </section>
      </CommentContext.Provider>
    </>
  );
}
function ButtonComment({ commentLength }) {
  const popupContext = useContext(PopupContext);
  const isLogin = useLogin();
  function handlePopup() {
    if (!isLogin) popupContext.setIsPopup(true);
  }
  return (
    <button
      onClick={handlePopup}
      href="#comment-section"
      className=" px-1 rounded-5 border border-primary-green bg-transparent text-error-emphasis d-flex align-items-center gap-2"
      style={{ fontSize: "14px" }}
    >
      {commentLength} <FaCommentAlt className="me-2" />
    </button>
  );
}
