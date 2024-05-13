import { useContext, useId, useRef } from "react";

import { useCurrentEditor } from "@tiptap/react";
import { EditContext } from "../../../context/EditContext";
export default function EditTextBar({ content }) {
	const editContext = useContext(EditContext);
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
		// if(authContext.componentType == "replies"){
		//   replyContext.setIsReply(isReply=>!isReply);
		// }
	}
	function handleOnDone() {
		if (editor.getText()) {
			editor.setEditable(false);
			editContext.setIsEdit(false);
			// if(authContext.componentType=="createComment"){
			//   let newCommentObject = {
			//     content:editor.getJSON(),
			//     upvote: [],
			//     replies: [],
			//     createBy: {
			//       username: authContext.username,
			//       profileImage: authContext.profileImage
			//     }
			//   }
			//   console.log("check new comment object: " + JSON.stringify(newCommentObject));
			//   console.log("check content: "+JSON.stringify(newCommentObject.content));
			//   commentContext.setNewComment([<Comment key={commentId} commentData={newCommentObject}/>, ...commentContext.newComment ]);
			// }

			// if(authContext.componentType == "replies"){
			//   let newReplyObject = {
			//     content:editor.getJSON(),
			//     upvote: [],
			//     replies: [],
			//     createBy: {
			//       username: authContext.username,
			//       profileImage: authContext.profileImage
			//     }
			//   }
			//   replyContext.setIsReply(isReply=>!isReply);
			//   replyContext.setNewReply([<Comment key={replyId} commentData={newReplyObject}/>, ...replyContext.newReply])
			// }

			// if (reset) {
			//   editor.commands.clearContent();
			// }

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
