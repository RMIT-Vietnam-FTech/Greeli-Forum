import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useSwrImmutable from "swr/immutable";

import { Button } from "react-bootstrap";
import ButtonUpvote from "../../../components/Forum/ButtonUpvote";
import { CommentContext } from "../../../context/CommentContext";
import { EditContextProvider } from "../../../context/EditContext";
import CreateCommentEditor from "./components/CreateCommentEditor/CreateCommentEditor";

import { BsShieldFillX } from "react-icons/bs";
import { BsShieldFillCheck } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
// import share icon
import {
	FacebookIcon,
	FacebookShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	RedditIcon,
	RedditShareButton,
	TwitterIcon,
	TwitterShareButton,
} from "react-share";

import { useLogin } from "../../../hooks/useLogin";

import { PopupContext } from "../../../context/PopupContext";
import ReplyComment from "../PostPage/components/ReplyComment";

axios.defaults.withCredentials = true;

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function PostComment({ postData, threadAdminId }) {
	const isLogin = useLogin();
	const [newComment, setNewComment] = useState([]);
	const [isApproved, setIsApproved] = useState(postData.isApproved);
	const navigate = useNavigate();

	async function handleApproved() {
		setIsApproved(true);
		const path = `/api/v1/admin/posts/${postData._id}`;
		await axios.put(
			path,
			{ threadId: postData.belongToThread },
			{
				headers: {
					//   Authorization: `Bearer ${
					//     JSON.parse(localStorage.getItem("user")).token
					//   }`,
				},
			},
		);
	}

	async function handleUnApproved() {
		try {
			//delete and redirect
			const path = `/api/v1/posts/${postData._id}`;
			await axios.delete(
				path,

				{
					data: {
						threadId: postData.belongToThread,
					},
					headers: {
						// Authorization: `Bearer ${
						//   JSON.parse(localStorage.getItem("user")).token
						// }`,
					},
				},
			);

			navigate(`/forum/threads/${postData.belongToThread}`);
		} catch (error) {
			console.error(error.message);
		}
	}
	const { data, error, isLoading } = useSwrImmutable(
		`/api/v1/comments?postId=${postData._id}&parentId=null`,
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
			<div className="d-flex justify-content-between align-items-center mb-3">
				<div className="d-flex gap-2">
					<ButtonUpvote
						upvote={postData.upvote}
						postId={postData._id}
					/>
					<ButtonComment commentLength={postData.comments.length} />
					<ButtonShare />
				</div>

				{/*show verify status */}
				{isLogin &&
				threadAdminId === JSON.parse(localStorage.getItem("user")).id &&
				!isApproved ? (
					<div className="d-flex gap-2 me-2">
						<Button
							onClick={handleApproved}
							className="border-greeli rounded-circle bg-transparent text-forum-emphasis"
						>
							<IoMdCheckmark />
						</Button>

						<Button
							onClick={handleUnApproved}
							className="border-greeli rounded-circle bg-transparent text-forum-emphasis"
						>
							<IoMdClose />
						</Button>
					</div>
				) : (
					<>
						{isLogin &&
						postData.createdBy.userId ===
							JSON.parse(localStorage.getItem("user")).id ? (
							<div className="d-flex align-items-center">
								<p
									className={`text-forum-emphasis p-0 m-0 ${
										isApproved ? null : "opacity-25"
									}`}
								>
									{isApproved ? "Approved" : "Unapproved"}
								</p>
								<div className="ms-3 fs-4">
									{isApproved ? (
										<BsShieldFillCheck className="text-success" />
									) : (
										<BsShieldFillX className="text-danger" />
									)}
								</div>
							</div>
						) : null}
					</>
				)}
			</div>
			<CommentContext.Provider value={{ newComment, setNewComment }}>
				<EditContextProvider>
					<CreateCommentEditor />
				</EditContextProvider>
				<section id="comment-section" className="mt-3 w-100">
					{newComment}
					{data.map((commentData) => {
						return (
							<ReplyComment
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
export function ButtonComment({ commentLength }) {
	const popupContext = useContext(PopupContext);
	const isLogin = useLogin();
	function handlePopup() {
		if (!isLogin) popupContext.setIsPopup(true);
	}
	return (
		<button
			onClick={handlePopup}
			href="#comment-section"
			className=" px-1 rounded-5 border border-primary-green bg-transparent text-forum-emphasis d-flex align-items-center gap-2"
			style={{ fontSize: "14px" }}
		>
			{commentLength} <FaCommentAlt className="me-2" />
		</button>
	);
}
export function ButtonShare() {
	const [showShareList, setShowShareList] = useState(false);
	const link = window.location.href;
	function handlePopup() {
		setShowShareList(!showShareList);
	}

	return (
		<div>
			<button
				onClick={handlePopup}
				className="px-1 rounded-5 border border-primary-green bg-transparent text-forum-emphasis"
				style={{ fontSize: "14px" }}
			>
				<FaShareFromSquare />
			</button>
			{showShareList && (
				<ShareList url={link} title="Check out this post!" />
			)}
		</div>
	);
}

export function ShareList({ url, title }) {
	return (
		<div className="container position-absolute">
			<FacebookShareButton url={url} quote={title} hashtag="#Greeli">
				<FacebookIcon size={32} round />
			</FacebookShareButton>
			<TwitterShareButton url={url} title={title}>
				<TwitterIcon size={32} round />
			</TwitterShareButton>
			<LinkedinShareButton url={url} title={title}>
				<LinkedinIcon size={32} round />
			</LinkedinShareButton>
			<RedditShareButton url={url} title={title}>
				<RedditIcon size={32} round />
			</RedditShareButton>
		</div>
	);
}