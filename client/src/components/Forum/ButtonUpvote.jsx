import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";

import { PopupContext } from "../../context/PopupContext";
import { useLogin } from "../../hooks/useLogin";

axios.defaults.withCredentials = true;

export default function ButtonUpvote({ upvote, postId, commentId }) {
	const isLogin = useLogin();
	const user = JSON.parse(localStorage.getItem("user"));
	const [nOfUpvote, setNofUpvote] = useState(upvote.length);
	const [isVoted, setIsVoted] = useState(user && upvote.includes(user.id));
	const popupContext = useContext(PopupContext);
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	});
	async function handleUpvote() {
		try {
			if (!isLogin) {
				popupContext.setIsPopup(true);
			} else {
				const token = JSON.parse(localStorage.getItem("user")).token;
				if (isVoted) {
					const index = upvote.indexOf(user.id);
					if (index > -1) {
						if (postId) {
							await axios.delete(
								baseUrl + `/api/v1/posts/${postId}/upvote`,
								{
									//   headers: {
									//     Authorization: `Bearer ${token}`,
									//   },
								},
							);
						}

						if (commentId) {
							await axios.delete(
								baseUrl +
									`/api/v1/comments/${commentId}/upvote`,
								{
									// headers: {
									//   Authorization: `Bearer ${token}`,
									// },
								},
							);
						}

						upvote.splice(index, 1);
						setNofUpvote((data) => data - 1);
						setIsVoted(false);
					}
				} else {
					if (postId) {
						axios.post(
							baseUrl + `/api/v1/posts/${postId}/upvote`,
							{},
							{
								// headers: {
								//   Authorization: `Bearer ${token}`,
								// },
							},
						);
					}

					if (commentId) {
						await axios.post(
							baseUrl + `/api/v1/comments/${commentId}/upvote`,
							{},
							{
								// headers: {
								//   Authorization: `Bearer ${token}`,
								// },
							},
						);
					}
					upvote.push(user.id); //push objectID of user -> update backend
					setNofUpvote((data) => data + 1);
					setIsVoted(true);
				}
			}
		} catch (e) {
			console.error(e.message);
		}
	}
	return (
		<button
			tabIndex="0"
			onClick={handleUpvote}
			className={
				(isVoted
					? "bg-primary-green text-white "
					: " text-forum-emphasis bg-transparent ") +
				"text-decoration-none border border-primary-green px-2  hover-style-green"
			}
			style={{ borderRadius: "20px", height: "25px" }}
		>
			{nOfUpvote}
			<BsArrowUpSquareFill size={14} className="ms-2 mb-1" />
		</button>
	);
}
