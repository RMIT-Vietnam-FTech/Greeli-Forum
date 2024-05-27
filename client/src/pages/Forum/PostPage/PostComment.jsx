import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useSWRInfinite from "swr/infinite";

import { Button } from "react-bootstrap";
import { CommentContext } from "../../../context/CommentContext";
import { EditContextProvider } from "../../../context/EditContext";
import CreateCommentEditor from "./components/CreateCommentEditor/CreateCommentEditor";
import ButtonUpvote from "../../../components/Forum/ButtonUpvote";

import { FaCommentAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { BsShieldFillX } from "react-icons/bs";
import { BsShieldFillCheck } from "react-icons/bs";

import { useLogin } from "../../../hooks/useLogin";

import { PopupContext } from "../../../context/PopupContext";
import ReplyComment from "../PostPage/components/ReplyComment";
import { useEditor } from "@tiptap/react";

const fetcher = (url) =>
  axios.get(url).then((res) => {
    return res.data.data;
  });
  const getMetadata = (url)=>{
   return axios.get(url).then((res)=>{
      return res.data.metadata;
    })
  }
export default function PostComment({ postData, threadAdminId }) {
  const isLogin = useLogin();
  const [newComment, setNewComment] = useState([]);
  const [isApproved, setIsApproved] = useState(postData.isApproved);
  const [metadata, setMetadata] = useState();
  let limit = 20, total = 19;
  const navigate = useNavigate();

  useEffect(()=>{
   getMetadata(`http://localhost:3001/api/v1/comments?postId=${
      postData._id
    }&parentId=null&page=1`).then((res)=>{
      setMetadata(res)
    });
    }, [])

    if(metadata){
      limit = metadata.limit;
      total = metadata.total;
    }
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
        }
      );

      navigate(`/forum/threads/${postData.belongToThread}`);
    } catch (error) {
      console.error(error.message);
    }
  }
  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index, prevData) => {
      if (prevData && !prevData.length) return null;
      return `http://localhost:3001/api/v1/comments?postId=${
        postData._id
      }&parentId=null&page=${index + 1}`;
    },
    fetcher
  );

  if (isLoading) {
    return "is loading";
  }
  const issues = data ? [].concat(...data) : [];
  console.log(`issues length: ${issues.length}`);
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
              className="border-greeli rounded-circle bg-transparent text-forum-emphasis"
            >
              <IoMdCheckmark />
            </Button>

            <Button
              onClick={handleUnApproved}
              className="border-greeli rounded-circle bg-transparent text-forum-emphasis"
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
                  className={`text-forum-emphasis p-0 m-0 ${
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
          {issues.map((commentData, index, data) => {
            return (
              <ReplyComment
                key={commentData._id}
                commentData={commentData}
                isLastIndex={index === data.length - 1}
              />
            );
          })}
        </section>
      </CommentContext.Provider>
      {issues.length > 0 && (size * limit < total) && 
      <button
        onClick={() => {
          setSize(size + 1);
        }}
        className="px-4 py-2 bg-forum-subtle text-white border border-0"
        style={{ borderRadius: "20px" }}
      >
        Load more comments
      </button>
      }
    </>
  );
}
export function ButtonComment({ commentLength }) {
  const popupContext = useContext(PopupContext);
  const isLogin = useLogin();
  function handlePopup() {
    if (!isLogin) popupContext.setIsPopup(true);
  }
  return (
    <button
      onClick={handlePopup}
      href="#comment-section"
      className=" px-1 rounded-5 border border-primary-green bg-transparent text-forum-emphasis d-flex align-items-center gap-2"
      style={{ fontSize: "14px" }}
    >
      {commentLength} <FaCommentAlt className="me-2" />
    </button>
  );
}
