import axios from "axios";
import { useState } from "react";

import Avatar from "./Avatar";
import DropDown from "./DropDown";
import EditTextEditor from "./EditTextEditor/EditTextEditor";
import ImageOrVideo from "./ImageOrVideo";

import { Link, useNavigate } from "react-router-dom";
import { AuthorizationContextProvider } from "../../context/AuthorizationContext";
import { EditContextProvider } from "../../context/EditContext";

import { Button } from "react-bootstrap";
import { ButtonComment } from "../../pages/Forum/PostPage/PostComment";
import ButtonUpvote from "./ButtonUpvote";

import { useLogin } from "../../hooks/useLogin";

import { BsShieldFillX } from "react-icons/bs";
import { BsShieldFillCheck } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

axios.defaults.withCredentials = true;

dayjs.extend(relativeTime);

export default function Post({ postData, isThreadAdmin }) {
	const isLogin = useLogin();
	const [newComment, setNewComment] = useState([]);
	const [isApproved, setIsApproved] = useState(postData.isApproved);
	const navigate = useNavigate();

	const handleUserProfileRedirect = () => {
		navigate(`/user/${postData.createdBy.userId}`, { root: true });
	};

	async function handleApproved() {
		setIsApproved(true);
		const path = `http://localhost:3001/api/v1/admin/posts/${postData._id}`;
		await axios.put(
			path,
			{ threadId: postData.belongToThread },
			{
				headers: {
					Authorization: `Bearer ${
						JSON.parse(localStorage.getItem("user")).token
					}`,
				},
			},
		);
	}

	async function handleUnApproved() {
		try {
			//delete and redirect
			const path = `http://localhost:3001/api/v1/posts/${postData._id}`;
			await axios.delete(
				path,

				{
					data: {
						threadId: postData.belongToThread,
					},
					headers: {
						Authorization: `Bearer ${
							JSON.parse(localStorage.getItem("user")).token
						}`,
					},
				},
			);

			navigate(`/forum/${postData.belongToThread}`);
		} catch (error) {
			console.error(error.message);
		}
	}

	return (
		<div
			className="mx-auto position-relative p-3 my-2"
			style={{ width: "95%" }}
		>
			<EditContextProvider>
				<div className="w-100 d-flex">
					{/*post header*/}
					<div
						className="d-flex gap-2"
						onClick={handleUserProfileRedirect}
					>
						<Avatar
							size="sm"
							src={postData.createdBy.profileImage}
						/>
						<p className="mb-0 text-general-emphasis">
							{postData.createdBy.username}
						</p>
						<li className="text-greeli-emphasis">
							{postData.isApproved
								? dayjs().to(dayjs(postData.verifiedAt))
								: dayjs().to(dayjs(postData.createdAt))}
						</li>
					</div>
					{/* <AuthorizationContextProvider
              componentType="post"
              objectId={postData._id}
            >
              <DropDown
                componentType="post"
                postId={postData._id}
                threadId={postData.belongToThread}
              />
            </AuthorizationContextProvider> */}
				</div>

				{/*post body*/}
				<div className=" mt-3 w-100">
					<Link
						to={`/forum/threads/${postData.belongToThread}/posts/${postData._id}`}
					>
						<div
							tabIndex="0"
							className="fs-5 fw-bold text-greeli-emphasis"
							style={{ wordBreak: "break-word" }}
						>
							{postData.title}
						</div>
					</Link>

					{postData.uploadFile ? (
						<div
							className=" my-4 bg-forum-subtle rounded-3 d-flex justify-content-center overflow-hidden"
							style={{ height: "45vh" }}
						>
							<ImageOrVideo
								alt={postData.createdBy.username}
								src={postData.uploadFile}
								isPost={false}
							/>
						</div>
					) : null}
					<Link
						to={`/forum/threads/${postData.belongToThread}/posts/${postData._id}`}
						className="cursor-pointer"
					>
						<EditTextEditor
							componentType="post"
							content={JSON.parse(postData.content)}
						/>
					</Link>
				</div>
			</EditContextProvider>

			<div className="d-flex justify-content-between align-items-center mb-3 z-3">
				{/* ----------------------------------- Upvote and Comment Button ------------------------------------- */}
				<div className="d-flex gap-2">
					<ButtonUpvote
						upvote={postData.upvote}
						postId={postData._id}
					/>
					<Link
						to={`/forum/threads/${postData.belongToThread}/posts/${postData._id}`}
					>
						<ButtonComment
							commentLength={postData.comments.length}
						/>
					</Link>
				</div>

				{/* ----------------------------------- Verify Status ------------------------------------- */}

				{/* for thread Admin  */}
				{isLogin && isThreadAdmin && !isApproved ? (
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
					// for post creator
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
		</div>
	);
}
