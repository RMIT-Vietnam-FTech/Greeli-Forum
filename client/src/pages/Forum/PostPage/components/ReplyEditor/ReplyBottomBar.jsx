import { useCurrentEditor } from "@tiptap/react";
import axios from "axios";
import { useEffect } from "react";

import { useContext, useId, useRef } from "react";
import { useParams } from "react-router-dom";
import { EditContext } from "../../../../../context/EditContext";
import { ReplyContext } from "../../../../../context/ReplyContext";
import ReplyComment from "../ReplyComment";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;
export default function ReplyBottomBar({ parentId }) {
	const editContext = useContext(EditContext);
	const replyContext = useContext(ReplyContext);
	const { postId } = useParams();
	const { editor } = useCurrentEditor();
	const createReplyError = document.querySelector(
		`#create-reply-section-error-${parentId}`,
	);
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	}, [process.env.NODE_ENV]);
	
	useEffect(() => {
		createReplyError.classList.add("d-none");
	}, [editor.getText(), replyContext.file]);

	if (!editor.isEditable) {
		editor.setEditable(true);
	}

	function handleOnCancel() {
		createReplyError.classList.add("d-none");
		editor.setEditable(false);
		editContext.setIsEdit(false);
		editor.commands.setContent("");
		replyContext.setIsReply(false);
	}

	async function handleOnDone(parentId) {
		if (editor.getText() || replyContext.file) {
			editor.setEditable(false);
			editContext.setIsEdit(false);
			replyContext.setIsReply(false);

			const user = await axios
				.get(
					baseUrl +
						`/api/user/${
							JSON.parse(localStorage.getItem("user")).id
						}`,
				)
				.then((res) => res.data);

			const formData = new FormData();
			formData.append("uploadFile", replyContext.file);
			formData.append("content", JSON.stringify(editor.getJSON()));
			formData.append("postId", postId);
			formData.append("parentId", parentId);
			//set content
			editor.commands.setContent("");
			const loadingReply = toast.loading(
				"create new reply is in progress",
			);
			const newReplyData = await axios
				.post(baseUrl + "/api/v1/comments", formData, {
					headers: {
						// Authorization: `Bearer ${
						//   JSON.parse(localStorage.getItem("user")).token
						// }`,
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
			toast.dismiss(loadingReply);
			toast.success("new reply is created successfully", {
				duration: 2000,
			});
		} else {
			// toggle error text editor
			createReplyError.classList.remove("d-none");
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
