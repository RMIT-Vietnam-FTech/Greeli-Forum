import { useEffect } from "react";
import AuthComponent from "../../../components/forum/AuthComponent";
import TextEditor from "../../../components/forum/TextEditor/TextEditor";
export default function CreateCommentEditor() {
	return (
		<AuthComponent componentType="createComment" unAuthorizedProcess={true}>
			<div className="mt-4">
				<TextEditor
					content=""
					toggleIsEditOnClick={true}
					resetClickDone={true}
				/>
			</div>
		</AuthComponent>
	);
}
