import { useCurrentEditor } from "@tiptap/react";
import { useContext, useId } from "react";
import { useParams } from "react-router-dom";
import { CommentContext } from "../../../../../context/CommentContext";
import { EditContext } from "../../../../../context/EditContext";
import Comment from "../Comment";
import axios from "axios";
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
	}
	async function handleOnDone() {
		if (editor.getText()) {
			editor.setEditable(false);
			editContext.setIsEdit(false);
			const user = await axios
				.get(
					`http://localhost:3001/api/user/${
						JSON.parse(localStorage.getItem("user")).id
					}`,
				)
				.then((res) => res.data);

			// store data in database
			const storeObject = {
				content: JSON.stringify(editor.getJSON()),
				postId: postId,
				parentId: null,
			};

			const newCommentData = await axios
				.post("http://localhost:3001/api/v1/comments", storeObject, {
					headers: {
						// Authorization: `Bearer ${
						// 	JSON.parse(localStorage.getItem("user")).token
						// }`,
					},
				})
				.then((res) => res.data);

			commentContext.setNewComment([
				<Comment key={commentId} commentData={newCommentData} />,
				...commentContext.newComment,
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
				onClick={() => handleOnDone()}
				className="btn border-primary-green btn-primary-green"
			>
				Done
			</button>
		</div>
	);
}
