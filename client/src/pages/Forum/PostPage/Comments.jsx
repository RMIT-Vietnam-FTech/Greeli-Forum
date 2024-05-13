import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useSwr from "swr";

import { CommentContext } from "../../../context/CommentContext";
import { EditContextProvider } from "../../../context/EditContext";
import Comment from "./components/Comment";
import CreateCommentEditor from "./components/CreateCommentEditor/CreateCommentEditor";
const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function Comments() {
	const { postId } = useParams();
	const [newComment, setNewComment] = useState([]);
	const { data, error, isLoading } = useSwr(
		"http://localhost:9000/api/v1/comments?postId=" +
			postId +
			"&parentId=null",
		fetcher,
	);
	if (error) {
		return "error";
	}
	if (isLoading) {
		return "is loading";
	}
	return (
		<>
			<CommentContext.Provider value={{ newComment, setNewComment }}>
				<EditContextProvider>
					<CreateCommentEditor />
				</EditContextProvider>
				<section className="mt-3 w-100">
					{newComment}
					{data.map((commentData) => {
						return (
							<Comment
								key={commentData._id}
								commentData={commentData}
							/>
						);
					})}
				</section>
			</CommentContext.Provider>
		</>
	);
}
