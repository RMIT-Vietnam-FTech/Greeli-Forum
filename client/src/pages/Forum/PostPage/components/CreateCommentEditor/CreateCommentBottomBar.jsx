import { useCurrentEditor } from "@tiptap/react";
import { useContext, useId } from "react";
import { CommentContext } from "../../../../../context/CommentContext";
import { EditContext } from "../../../../../context/EditContext";
import Comment from "../Comment";
export default function EditTextBar({ content }) {
	const editContext = useContext(EditContext);
	const commentContext = useContext(CommentContext);
	const commentId = useId();

	const { editor } = useCurrentEditor();
	if (!editor.isEditable) {
		editor.setEditable(true);
	}
	function handleOnCancel() {
		editor.setEditable(false);
		editContext.setIsEdit(false);
		editor.commands.setContent("");
	}
	function handleOnDone() {
		if (editor.getText()) {
			editor.setEditable(false);
			editContext.setIsEdit(false);
			const newCommentObject = {
				content: editor.getJSON(),
				parentId: null,
				replies: [],
				upvote: [],
				// from backend
				createdBy: {
					username: "user3",
					profileImage:
						"https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-1/111112726_975766876189942_8939912075759162480_n.jpg?stp=dst-jpg_p480x480&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGADP4zo6K-PrEMelsLKA_SxodS2ZBrZZ3Gh1LZkGtlnVtENJGXDWEdWpnSSdfYvETu6osq992rv7m9JuiVoqZN&_nc_ohc=xCCHpNIx4woQ7kNvgH197in&_nc_ht=scontent-hkg4-1.xx&oh=00_AfCpz4yDT8nGGOo9PebZCP2ew71Dp2mgAjclW7TkPilrQA&oe=665B1A31",
				},
			};
			commentContext.setNewComment([
				<Comment key={commentId} commentData={newCommentObject} />,
				...commentContext.newComment,
			]);

			editor.commands.setContent("");
			// store data in database
			//command PUT or POST  on what link
			//--> POST when edit, PUT when create, pass type and
		} else {
			// toggle error text editor
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
