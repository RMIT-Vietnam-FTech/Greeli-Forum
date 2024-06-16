import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSwrImmutable from "swr/immutable";

import Avatar from "../../../../components/Forum/Avatar";
import ButtonUpvote from "../../../../components/Forum/ButtonUpvote";
import DropDown from "../../../../components/Forum/DropDown";

import { AuthorizationContextProvider } from "../../../../context/AuthorizationContext";
import { EditContextProvider } from "../../../../context/EditContext";
import { ReplyContext } from "../../../../context/ReplyContext";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import EditTextEditor from "../../../../components/Forum/EditTextEditor/EditTextEditor";
import ReplyButton from "./ReplyButton";
import ReplyEditor from "./ReplyEditor/ReplyEditor";

import { CiCirclePlus } from "react-icons/ci";
import ImageOrVideo from "../../../../components/Forum/ImageOrVideo";
import useSWRImmutable from "swr/immutable";
dayjs.extend(relativeTime);

axios.defaults.withCredentials = true;

const fetcher = (url) =>
	axios.get(url).then((res) => {
		return res.data.data;
	});

export default function ReplyComment({ commentData, isLastIndex, isNew }) {
	const { postId } = useParams();
	const [newReply, setNewReply] = useState([]);
	const [expand, setExpand] = useState(false);
	const [isReply, setIsReply] = useState(false);
	const [file, setFile] = useState();

	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	}, [process.env.NODE_ENV]);

	const { data, error, isLoading } = useSWRImmutable(
		commentData.replies.length > 0 && expand
			? baseUrl +
					`/api/v1/comments?postsId=${postId}&parentId=${commentData._id}`
			: null,
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
			<ReplyContext.Provider
				value={{
					newReply,
					setNewReply,
					isReply,
					setIsReply,
					file,
					setFile,
				}}
			>
				<div
					tabIndex="0"
					aria-label="comment section"
					className="my-3 position-relative"
					id={commentData._id}
				>
					{commentData.parentId !== null && (
						<div
							className="bg-login-subtle opacity-25 position-absolute"
							style={{
								width: "30px",
								height: "1px",
								top: "19px",
								left: "-12px",
							}}
						></div>
					)}
					{(commentData.replies.length > 0 ||
						newReply.length > 0) && (
						<div
							className="bg-login-subtle h-100 opacity-25 position-absolute"
							style={{ width: "1px", top: "16px", left: "10px" }}
						></div>
					)}
					{(isLastIndex || isNew) && (
						<div
							className="bg-greeli-subtle h-100 position-absolute z-1"
							style={{
								width: "5px",
								top: "20px",
								left: "-13px",
							}}
						></div>
					)}
					<div className="d-flex align-items-center gap-1 py-2">
						{/* avatar */}
						<Avatar
							size="sm"
							src={commentData.createdBy.profileImage}
						/>

						{/* username */}
						<p
							tabIndex="0"
							className="fw-bold m-0 text-login-emphasis"
							style={{ fontSize: "14px" }}
						>
							{commentData.createdBy.username}
						</p>
						<li
							className="text-greeli-emphasis"
							style={{ fontSize: "12px" }}
						>
							{dayjs().to(dayjs(commentData.createdAt))}
						</li>
						{JSON.parse(localStorage.getItem("user"))?.role ===
							"admin" && (
							<div
								className="position-relative bg-transparent "
								style={{ left: "55px", height: "35px" }}
							>
								<AuthorizationContextProvider>
									<DropDown
										componentType="comment"
										data={commentData}
									/>
								</AuthorizationContextProvider>
							</div>
						)}
					</div>

					{/*content*/}
					{commentData.archived.isArchived ? (
						<div
							className={"px-3 py-1 bg-hidden-light ms-4"}
							style={{ width: "300px", borderRadius: "20px" }}
						>
							{/*archived content UI*/}
							<p
								style={{ fontSize: "14px" }}
								className="text-white w-100"
							>
								this comment was archived by forum admin
							</p>
						</div>
					) : (
						<>
							{commentData.uploadFile && (
								<div
									style={{
										width: "250px",
										borderRadius: "20px",
									}}
									className="ms-4 my-2 position-relative overflow-hidden"
								>
									<ImageOrVideo
										uploadFile={commentData.uploadFile}
										w100={true}
										h100={true}
									/>
								</div>
							)}
							<div className="ms-4">
								<EditContextProvider>
									<EditTextEditor
										content={JSON.parse(
											commentData.content,
										)}
									/>
								</EditContextProvider>

								{/*upvote*/}
								<ButtonUpvote
									upvote={commentData.upvote}
									commentId={commentData._id}
								/>

								{/*reply*/}
								<EditContextProvider>
									<ReplyButton
										nOfReply={commentData.replies.length}
									/>
									{isReply ? (
										<ReplyEditor
											parentId={commentData._id}
										/>
									) : null}
								</EditContextProvider>
							</div>
							{/*expand reply buttons*/}
							{commentData.replies.length > 0 && !expand && (
								<a
									onClick={() => {
										setExpand(true);
									}}
									className="px-1 pb-2 position-relative cursor-pointer text-secondary  bg-greeli-subtle z-2"
									style={{
										borderRadius: "20px",
										left: "-5px",
										top: "15px",
									}}
								>
									<div className="d-inline-block fs-4">
										<CiCirclePlus />{" "}
									</div>
									{commentData.replies.length} more replies
								</a>
							)}
						</>
					)}
					<div style={{ marginLeft: "23px" }}>
						{newReply}
						{data
							? data.map((commentData, index, data) => {
									return (
										<ReplyComment
											key={commentData._id}
											commentData={commentData}
											isLastIndex={
												index === data.length - 1
											}
										/>
									);
								})
							: []}
					</div>
				</div>
			</ReplyContext.Provider>
		</>
	);
}
