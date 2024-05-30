import axios from "axios";
import { useEffect, useState } from "react";

import Avatar from "./Avatar";
import DropDown from "./DropDown";
import EditTextEditor from "./EditTextEditor/EditTextEditor";
import ImageOrVideo from "./ImageOrVideo";

import { AuthorizationContextProvider } from "../../context/AuthorizationContext";
import { EditContextProvider } from "../../context/EditContext";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";
import ButtonUpvote from "./ButtonUpvote";
import { ButtonComment } from "../../pages/Forum/PostPage/PostComment";

import { useLogin } from "../../hooks/useLogin";

import { IoMdClose } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { BsShieldFillX } from "react-icons/bs";
import { BsShieldFillCheck } from "react-icons/bs";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Skeleton from "react-loading-skeleton";

dayjs.extend(relativeTime);

export default function Post({ postData, isThreadAdmin }) {
	const isLogin = useLogin();
	const [newComment, setNewComment] = useState([]);
	const [isApproved, setIsApproved] = useState(postData.isApproved);
	const [threadData, setTheadData] = useState();
	const navigate = useNavigate();

	const handleUserProfileRedirect = () => {
		navigate(`/user/${postData.createdBy.userId}`, { root: true });
	};
	const handleCommunityRedirect = () => {
		navigate(`/forum/communities/${postData.belongToThread}`, {
			root: true,
		});
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
			//archived and redirect
			const path = `http://localhost:3001/api/v1/posts/${postData._id}/archive`;
			await axios.post(
				path,
				{
					threadId: postData.belongToThread,
				},
				{
					headers: {
						// Authorization: `Bearer ${
						//   JSON.parse(localStorage.getItem("user")).token
						// }`,
					},
				},
			);

			navigate(`/forum/communities/${postData.belongToThread}`);
		} catch (error) {
			console.error(error.message);
		}
	}
	useEffect(() => {
		axios
			.get(
				`http://localhost:3001/api/v1/threads/${postData.belongToThread}`,
			)
			.then((res) => {
				setTheadData(res.data);
			});
	}, []);
	return (
		<div className="mx-auto  p-3 my-2" style={{ width: "95%" }}>
			<EditContextProvider>
				<div className="w-100 d-flex">
					{/*----------------------------post header--------------------------------------------------------*/}
					<div className="d-flex gap-2 position-relative">
						{threadData ? (
							<div
								className="cursor-pointer"
								onClick={handleCommunityRedirect}
							>
								<Avatar
									size="lg"
									src={threadData.uploadFile.src}
								/>
							</div>
						) : (
							<Skeleton width="60px" height="60px" circle />
						)}
						<p
							className="mb-0 text-general-emphasis fw-bold cursor-pointer"
							onClick={handleCommunityRedirect}
						>
							{threadData ? threadData.title : <Skeleton />}
						</p>
						<li className="text-greeli-emphasis">
							{postData.isApproved
								? dayjs().to(dayjs(postData.verifiedAt))
								: dayjs().to(dayjs(postData.createdAt))}
						</li>

						<p
							onClick={handleUserProfileRedirect}
							className="text-secondary position-absolute cursor-pointer"
							style={{ top: "25px", left: "70px" }}
						>
							{postData.createdBy.username}
						</p>
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

				{/*-------------------------------------------post body -----------------------------------------*/}
				<div className=" mt-3 w-100">
					<Link
						to={`/forum/communities/${postData.belongToThread}/posts/${postData._id}`}
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
							className=" my-4 bg-forum-subtle d-flex justify-content-center align-items-center overflow-hidden"
							style={{ height: "45vh", borderRadius: "0.75rem" }}
						>
							<ImageOrVideo
								alt={postData.createdBy.username}
								uploadFile={postData.uploadFile}
								h100={true}
								w100={false}
							/>
						</div>
					) : null}
					<a
						href={`/forum/communities/${postData.belongToThread}/posts/${postData._id}`}
						className="cursor-pointer post-content-wrapper d-block w-100 overflow-hidden"
					>
						<EditTextEditor
							className="post-content"
							cursorPointer={true}
							componentType="post"
							isOverflow={true}
							content={JSON.parse(postData.content)}
						/>
					</a>
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
						to={`/forum/communities/${postData.belongToThread}/posts/${postData._id}`}
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
						(isThreadAdmin ||
							postData.createdBy.userId ===
								JSON.parse(localStorage.getItem("user")).id) ? (
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
