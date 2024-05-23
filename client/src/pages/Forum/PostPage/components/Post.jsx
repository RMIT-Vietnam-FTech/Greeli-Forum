import { Link, useNavigate, useParams } from "react-router-dom";

import { Button } from "react-bootstrap";

import Avatar from "../../../../components/forum/Avatar";
import ImageOrVideo from "../../../../components/forum/ImageOrVideo";
import { IoIosPaper } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { ImArrowUp } from "react-icons/im";
import { FaCommentAlt } from "react-icons/fa";

import { useContext, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { ThemeContext } from "../../../../context/ThemeContext";
axios.defaults.withCredentials = true;
dayjs.extend(relativeTime);

export default function Post({ postData, isThreadAdmin }) {
	const { isDarkMode } = useContext(ThemeContext);
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
			const path = `/api/v1/admin/posts/${postData._id}`;
			await axios.delete(path, {
				data: {
					threadId: postData.belongToThread,
				},
				headers: {
					Authorization: `Bearer ${
						JSON.parse(localStorage.getItem("user")).token
					}`,
				},
			});
		} catch (error) {
			console.error(error.message);
		}
	}
	if (isThreadAdmin || isApproved) {
		return (
			<div
				className={
					"w-100 position-relative d-flex justify-content-center bg-forum-subtle my-4 p-3"
				}
				style={{ borderRadius: "0.75rem" }}
				data-bs-theme={isDarkMode ? "dark" : "light"}
			>
				<div className="w-100 d-flex gap-2 justify-content-between align-items-center bg-primary-900 text-white text-decoration-none  ">
					{/*verification buttons*/}
					{!isApproved && isThreadAdmin && (
						<div className="d-flex flex-column gap-2 me-2">
							<Button
								onClick={handleApproved}
								className="bg-primary-green-900 border-0 rounded-circle"
							>
								<IoMdCheckmark />
							</Button>
							<Button
								onClick={handleUnApproved}
								className="bg-primary-green-900 border-0 rounded-circle"
							>
								<IoMdClose />
							</Button>
						</div>
					)}
					{/* main */}
					<Link
						aria-label="post"
						to={`/forum/threads/${postData.belongToThread}/posts/${postData._id}`}
						className="w-100 position-relative d-flex justify-content-center text-white align-items-center"
					>
						<div className="w-75 d-flex flex-column justify-content-between">
							{/*left side*/}

							<div className="d-flex gap-2">
								{/*avatar*/}
								<Avatar src={postData.createdBy.profileImage} />
								<div className="d-flex gap-2">
									<p
										className="mb-0 text-white"
										style={{ fontSize: "14px" }}
									>
										{postData.createdBy.username}
									</p>
									<li style={{ color: "#AAC6B9" }}>
										{dayjs().to(dayjs(postData.createdAt))}
									</li>
								</div>
							</div>
							{/*content*/}

							<p
								tabIndex="0"
								aria-label="post title"
								className="m-0 mt-2 fw-bold"
								style={{ wordBreak: "break-word" }}
							>
								{postData.title}
							</p>

							{/*upvote, comment, approve check mark*/}
							<div className="d-flex mt-3 justify-content-between">
								<div className="d-flex gap-2">
									{/*button upvote*/}
									<button
										aria-label="upvote"
										className=" px-3 d-flex align-items-center rounded-5 text-white border border-primary-green-900 bg-primary-green-900 "
									>
										<p tabIndex="0" className="m-0 p-0">
											{postData.upvote.length}
										</p>
										<ImArrowUp className="ms-2" />
									</button>
									{/**button comment*/}
									<button
										aria-label="comment"
										className=" px-3 d-flex align-items-center rounded-5 text-white border border-primary-green-900 bg-primary-green-900 "
									>
										<p tabIndex="0" className="m-0 p-0">
											{postData.comments.length}
										</p>
										<FaCommentAlt className="ms-2" />
									</button>
								</div>

								{/*check mark*/}
								{isThreadAdmin && (
									<div className="d-flex align-items-center me-2">
										<p
											className={"fw-thin p-0 m-0 "}
											style={{ color: "#AAC6B9" }}
										>
											{isApproved
												? "Approved"
												: "Unapproved"}
										</p>
										<div className="ms-1 fs-4">
											{isApproved ? (
												<IoCheckmarkCircle className="text-success" />
											) : (
												<IoCloseCircle className="text-danger" />
											)}
										</div>
									</div>
								)}
							</div>
						</div>
						{/*right side*/}
						{postData.uploadFile ? (
							<div
								className=" w-25 d-flex justify-content-center bg-primary-green-900 rounded-3 overflow-hidden "
								style={{ height: "100px" }}
							>
								<ImageOrVideo
									alt={postData.createdBy.username}
									src={postData.uploadFile}
									isPost={true}
								/>
							</div>
						) : (
							<div
								className=" w-25 d-flex justify-content-center align-items-center bg-primary-green-900 rounded-3 overflow-hidden "
								style={{ height: "100px" }}
							>
								<IoIosPaper className="w-75 h-75 text-primary-green-400" />
							</div>
						)}
					</Link>
				</div>
			</div>
		);
	} else {
		return <></>;
	}
}
