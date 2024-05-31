import { useCurrentEditor } from "@tiptap/react";
import { useContext, useEffect, useId } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

import { CommentContext } from "../../../../../context/CommentContext";
import { EditContext } from "../../../../../context/EditContext";
import Comment from "../ReplyComment";
axios.defaults.withCredentials = true;

export default function CreateCommentBottomBar({ content }) {
  const { editor } = useCurrentEditor();
  const editContext = useContext(EditContext);
  const commentContext = useContext(CommentContext);
  const { postId } = useParams();
  const createCommentError = document.querySelector(
    "#create-comment-section-error"
  );

  useEffect(() => {
    createCommentError.classList.add("d-none");
  }, [editor.getText(), commentContext.file]);

  if (!editor.isEditable) {
    editor.setEditable(true);
  }
  function handleOnCancel() {
    createCommentError.classList.add("d-none");
    editor.setEditable(false);
    editContext.setIsEdit(false);
    editor.commands.setContent("");
  }
  async function handleOnDone() {
    try {
      if (editor.getText() || commentContext.file) {
        editor.setEditable(false);
        editContext.setIsEdit(false);

        // store data in database
        const formData = new FormData();
        formData.append("uploadFile", commentContext.file);
        formData.append("content", JSON.stringify(editor.getJSON()));
        formData.append("postId", postId);

        editor.commands.setContent("");
        const loadingComment = toast.loading(
          "create new comment is in progress"
        );
        const newCommentData = await axios
          .post("http://localhost:3001/api/v1/comments", formData, {
            headers: {
              // Authorization: `Bearer ${
              //   JSON.parse(localStorage.getItem("user")).token
              // }`,
            },
          })
          .then((res) => res.data);
        toast.dismiss(loadingComment);
        toast.success("new comment is created successfully", {
          duration: 2000,
        });
        commentContext.setNewComment([
          <Comment key={newCommentData._id} commentData={newCommentData} />,
          ...commentContext.newComment,
        ]);

        //set content
      } else {
        // toggle error text editor

        createCommentError.classList.remove("d-none");
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <div className="d-flex justify-content-end gap-3 w-80 my-2 px-3">
      <button
        onClick={handleOnCancel}
        className="btn border-primary-green btn-primary-green"
      >
        Cancel
      </button>
      <button
        onClick={() => handleOnDone()}
        className="btn border-primary-green btn-primary-green"
      >
        Done
      </button>
    </div>
  );
}
