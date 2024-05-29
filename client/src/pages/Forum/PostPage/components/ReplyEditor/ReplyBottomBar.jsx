import { useCurrentEditor } from "@tiptap/react";
import axios from "axios";
import { useContext, useId, useRef } from "react";
import { useParams } from "react-router-dom";
import { EditContext } from "../../../../../context/EditContext";
import { ReplyContext } from "../../../../../context/ReplyContext";
import ReplyComment from "../ReplyComment";

axios.defaults.withCredentials = true;
export default function ReplyBottomBar({ parentId }) {
	const editContext = useContext(EditContext);
	const replyContext = useContext(ReplyContext);
	const { postId } = useParams();
	const { editor } = useCurrentEditor();

	if (!editor.isEditable) {
		editor.setEditable(true);
	}
	function handleOnCancel() {
		editor.setEditable(false);
		editContext.setIsEdit(false);
		editor.commands.setContent("");
		replyContext.setIsReply(false);
	}

	async function handleOnDone(parentId) {
		console.log("check parentId: " + parentId);
		if (editor.getText()) {
			editor.setEditable(false);
			editContext.setIsEdit(false);
			replyContext.setIsReply(false);

			const user = await axios
				.get(
					`http://localhost:3001/api/user/${
						JSON.parse(localStorage.getItem("user")).id
					}`,
				)
				.then((res) => res.data);

      const formData = new FormData();
      formData.append("uploadFile", replyContext.file);
      formData.append("content", JSON.stringify(editor.getJSON()));
      formData.append("postId", postId);
      formData.append("parentId", parentId);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      const newReplyData = await axios
        .post("http://localhost:3001/api/v1/comments", formData, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        })
        .then((res) => res.data);

      replyContext.setNewReply([
        <ReplyComment
          key={newReplyData._id}
          commentData={newReplyData}
          isNew={true}
        />,
      ]);

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
				onClick={() => handleOnDone(parentId)}
				className="btn border-primary-green btn-primary-green"
			>
				Done
			</button>
		</div>
	);
}
