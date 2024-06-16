import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { MdInsertComment } from "react-icons/md";
import { TbArrowBigUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../../../context/ProfileContext";

const ThreadItem = (props) => {
	const [threadTitle, setThreadTitle] = useState("Lorem ipsum dolo");
	const navigate = useNavigate();
	var {
		postId,
		author,
		comment,
		content,
		createdDate,
		threadId,
		title,
		upvote,
		uploadFile,
	} = props.post;
	var link = `/forum/communities/${threadId}/posts/${postId}`;
	const { tab } = props.tab;
	const data = useProfileContext();
	const { profileImage } = data;
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	}, [process.env.NODE_ENV]);

	//GET BELONGING POST AND THREAD TITLE
	var belongingPost = null;
	const getPostThread = async (threadId) => {
		const configuration = {
			method: "get",
			url: baseUrl + `/api/v1/comments/${postId}/getPost/`,
		};
		await axios(configuration)
			.then((response) => {
				belongingPost = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	};

	//GET POSTS AND THREADS ID IF RENDER COMMENTS
	const getBelongingPost = async (postId) => {
		await getPostThread(postId);
		// console.log(belongingPost);
		threadId = [
			belongingPost?.post?.belongToThread,
			belongingPost?.post?._id,
		];
		link = `/forum/communities/${threadId[0]}/posts/${threadId[1]}#${postId}`;
		// console.log(threadId);
	};
	if (props.tab === "Created Posts") {
		getBelongingPost(postId);
	}
	// -------------------------------------------

	useEffect(() => {
		const getPostThreadAsync = async (threadId) => {
			const configuration = {
				method: "get",
				url: baseUrl + `/api/v1/threads/${threadId}`,
			};
			await axios(configuration)
				.then((response) => {
					setThreadTitle(response.data.title);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		threadId && getPostThreadAsync(threadId);
	}, [threadId]);

	//REDIRECT TO POST PAGE
	const handlePostClick = () => {
		navigate(link, {
			replace: true,
		});
		// console.log(link);
	};

	return (
		<div
			className="bg-primary-green post-item px-3 py-3 mb-3"
			onClick={handlePostClick}
			role="article"
		>
			<div className="w-100 d-flex justify-content-end">
				<button
					aria-label="More options"
					className="btn btn-link p-0 text-decoration-none"
				>
					{/* <IoIosMore className="info-icon" color={"white"} /> */}
				</button>
			</div>
			<div className="d-flex w-100 container post-main-container justify-content-between">
				<div className="post-main-content d-flex flex-column justify-content-between">
					<div className="d-flex flex-row post-author">
						<img
							className="rounded-circle"
							src={profileImage}
							alt={`Author: ${author?.username}`}
							style={{ aspectRatio: "1/1" }}
						/>
						<div className="d-flex flex-md-column flex-row-reverse justify-content-center">
							<div className="w-100 d-flex flex-row flex-sm-nowrap flex-wrap justify-content-start justify-content-sm-around">
								<p className="d-none d-md-block text-primary-yellow fw-bold m-0">
									{props.tab === "Created Threads" &&
										`${threadTitle} /`}
									{title}
								</p>
								<p className="text-white m-0">{createdDate}</p>
							</div>
							<p className="text-white p-0 m-0">
								{author?.username}
							</p>
						</div>
					</div>
					<p className="d-md-none d-block text-primary-yellow fw-bold m-0">
						{threadTitle}/{title}
					</p>
					<p className="d-none d-md-block w-100 text-white mt-3">
						{content}
					</p>
					<div className="d-flex justify-content-start interaction-menu">
						<button
							aria-label={`Upvote, current count: ${upvote}`}
							className="bg-primary-green-900 text-white d-flex flex-row justify-content-center align-items-center py-2 px-2 upvote btn btn-link p-0 text-decoration-none p-0"
						>
							<TbArrowBigUp
								className="info-icon"
								color={"white"}
							/>
							<p className="p-0 m-0">{upvote}</p>
						</button>
						<button
							aria-label={`Comments, current count: ${comment}`}
							className="bg-primary-green-900 text-white d-flex flex-row justify-content-center align-items-center py-2 px-2 comment btn btn-link p-0 text-decoration-none p-0"
						>
							<MdInsertComment
								className="info-icon"
								color={"white"}
							/>
							<p className="p-0 m-0">{comment}</p>
						</button>
					</div>
				</div>
				{uploadFile && (
					<div className="d-none d-md-block">
						<img
							className="post-img"
							src={uploadFile}
							alt={`Post titled ${title}`}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default ThreadItem;
