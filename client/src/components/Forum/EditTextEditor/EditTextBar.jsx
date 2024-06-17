import { useCurrentEditor } from "@tiptap/react";
import axios from "axios";
import { useContext, useId, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EditContext } from "../../../context/EditContext";
axios.defaults.withCredentials = true;

export default function EditTextBar({ content, componentType }) {
	const editContext = useContext(EditContext);
	const { threadId, postId } = useParams();
	const component = componentType;
	let objectId;
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	}, [process.env.NODE_ENV]);

	if (component == "post") {
		objectId = postId;
	} else {
		objectId = threadId;
	}
	// const commentId = useId();
	// const replyId = useId();
	const { editor } = useCurrentEditor();
	if (!editor.isEditable) {
		editor.setEditable(true);
	}
	function handleOnCancel() {
		editor.setEditable(false);
		editContext.setIsEdit(false);
		editor.commands.setContent(content);
	}
	async function handleOnDone() {
		try {
			if (editor.getText()) {
				editor.setEditable(false);
				editContext.setIsEdit(false);
				// store data (PUT) in database
				const currentContent = JSON.stringify(editor.getJSON());
				await axios.put(
					baseUrl + `/api/v1/${component}s/${objectId}`,
					{
						content: currentContent,
					},
					{
						headers: {
							// Authorization: `Bearer ${
							//  JSON.parse(localStorage.getItem("user")).token
							// }`,
						},
					},
				);
			} else {
				// toggle error text editor
			}
		} catch (error) {
			console.error(error.message.data);
		}
	}
	return (
		<div className="d-flex justify-content-end gap-3 w-80 mx-auto px-3">
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
