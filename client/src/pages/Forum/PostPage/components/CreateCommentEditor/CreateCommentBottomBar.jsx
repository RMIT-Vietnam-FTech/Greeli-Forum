import { useCurrentEditor } from "@tiptap/react";
import { useContext, useId } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { CommentContext } from "../../../../../context/CommentContext";
import { EditContext } from "../../../../../context/EditContext";
import Comment from "../ReplyComment";
axios.defaults.withCredentials = true;

export default function CreateCommentBottomBar({ content }) {
	const editContext = useContext(EditContext);
	const commentContext = useContext(CommentContext);
	const commentId = useId();
	const { postId } = useParams();

  const { editor } = useCurrentEditor();
  if (!editor.isEditable) {
    editor.setEditable(true);
  }
  function handleOnCancel() {
    editor.setEditable(false);
    editContext.setIsEdit(false);
    editor.commands.setContent("");
    commentContext.setFile(undefined);
  }
  async function handleOnDone() {
    if (editor.getText()) {
      editor.setEditable(false);
      editContext.setIsEdit(false);
      commentContext.setFile(undefined);
      const user = await axios
        .get(
          `http://localhost:3001/api/user/${
            JSON.parse(localStorage.getItem("user")).id
          }`
        )
        .then((res) => res.data);

    
      const formData = new FormData();
      formData.append("uploadFile", commentContext.file);
      formData.append("content", JSON.stringify(editor.getJSON()));
      formData.append("postId", postId);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      const newCommentData = await axios
        .post("http://localhost:3001/api/v1/comments", formData, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        })
        .then((res) => res.data);

      // commentContext.setNewComment([
      //   <Comment key={newCommentData._id} commentData={newCommentData} />,
      //   ...commentContext.newComment,
      // ]);

			//set content
			editor.commands.setContent("");
		} else {
			// toggle error text editor
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
