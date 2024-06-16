import axios from "axios";
import { useEffect, useState } from "react";

import { useMediaQuery } from "./RightSideBar/RightSideBarThread";

import Avatar from "./Avatar";
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
import Skeleton from "react-loading-skeleton";
import ButtonShare from "./ButtonShare";

dayjs.extend(relativeTime);

export default function Post({ postData, isThreadAdmin }) {
	const matchWindowWidth = useMediaQuery("(max-width: 800px)");
	const isLogin = useLogin();
	const [newComment, setNewComment] = useState([]);
	const [isApproved, setIsApproved] = useState(postData.isApproved);
	const [threadData, setTheadData] = useState();
	const navigate = useNavigate();
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	}, [process.env.NODE_ENV]);

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
		const path = baseUrl + `/api/v1/admin/posts/${postData._id}`;
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
			const path = baseUrl + `/api/v1/posts/${postData._id}/archive`;
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
			.get(baseUrl + `/api/v1/threads/${postData.belongToThread}`)
			.then((res) => {
				setTheadData(res.data);
			});
	}, []);
	return (
		<div
			className="mx-auto  p-3 my-2 hover-style"
			style={{ width: "100%", borderRadius: "20px" }}
		>
			<EditContextProvider>
				<div className="w-100 d-flex">
					{/*----------------------------post header--------------------------------------------------------*/}
					<div className="d-flex gap-2 position-relative">
						{threadData ? (
							<div
								className="cursor-pointer"
								onClick={handleCommunityRedirect}
							>
								<Avatar src={threadData.uploadFile?.src} />
							</div>
						) : (
							<Skeleton width="60px" height="60px" circle />
						)}
						<div
							style={
								matchWindowWidth ? { maxWidth: "140px" } : {}
							}
						>
							<p
								className="mb-0 p-0 text-general-emphasis fw-bold cursor-pointer position-relative"
								style={{
									fontSize: "14px",
									wordBreak: "break-all",
								}}
								onClick={handleCommunityRedirect}
							>
								community/
								{threadData ? threadData.title : <Skeleton />}
							</p>
							<p
								style={{ fontSize: "14px" }}
								onClick={handleUserProfileRedirect}
								className="m-0 p-0 text-secondary cursor-pointer "
							>
								{postData.createdBy.username}
							</p>
						</div>
						<div
							style={{ height: "12px", marginTop: "5px" }}
							className="d-flex align-items-center gap-1"
						>
							<div
								className="rounded-circle bg-black"
								style={{ width: "3px", height: "3px" }}
							></div>
							<p
								className="text-greeli-emphasis m-0 p-0"
								style={{ fontSize: "12px" }}
							>
								{postData.isApproved
									? dayjs().to(dayjs(postData.verifiedAt))
									: dayjs().to(dayjs(postData.createdAt))}
							</p>
						</div>
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
								alt={postData.title}
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

			<div className="d-flex justify-content-between align-items-center mt-2 z-3">
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
					<ButtonShare
						location={`http://localhost:3000/forum/communities/${postData.belongToThread}/posts/${postData._id}`}
					/>
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
