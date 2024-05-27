import { IoIosMore } from "react-icons/io";
import { MdInsertComment } from "react-icons/md";
import { TbArrowBigUp } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostItem = (props) => {
	const [threadTitle, setThreadTitle] = useState("Lorem ipsum dolo");
	const navigate = useNavigate();
	const {
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

	useEffect(() => {
		const getPostThreadAsync = async (threadId) => {
			const configuration = {
				method: "get",
				url: `http://localhost:3001/api/v1/threads/${threadId}`,
			};
			await axios(configuration)
				.then((response) => {
					setThreadTitle(response.data.title);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		getPostThreadAsync(threadId);
	}, [threadId]);

	//REDIRECT TO POST PAGE
	const handlePostClick = () => {
		navigate(`/forum/threads/${threadId}/posts/${postId}`, { replace: true });
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
					<IoIosMore className="info-icon" color={"white"} />
				</button>
			</div>
			<div className="d-flex w-100 container post-main-container justify-content-between">
				<div className="post-main-content d-flex flex-column justify-content-between">
					<div className="d-flex flex-row post-author">
						<img
							className="rounded-circle"
							src={author.profileImage}
							alt={`Author: ${author.username}`}
						/>
						<div className="d-flex flex-md-column flex-row-reverse justify-content-center">
							<div className="w-100 d-flex flex-row flex-sm-nowrap flex-wrap justify-content-start justify-content-sm-around">
								<p className="d-none d-md-block text-primary-yellow fw-bold m-0">
									{threadTitle}/{title}
								</p>
								<p className="text-white m-0">{createdDate}</p>
							</div>
							<p className="text-white p-0 m-0">{author.username}</p>
						</div>
					</div>
					<p className="d-md-none d-block text-primary-yellow fw-bold m-0">
						{threadTitle}/{title}
					</p>
					<p className="d-none d-md-block w-100 text-white mt-3">{content}</p>
					<div className="d-flex justify-content-start interaction-menu">
						<button
							aria-label={`Upvote, current count: ${upvote}`}
							className="bg-primary-green-900 text-white d-flex flex-row justify-content-center align-items-center py-2 px-2 upvote btn btn-link p-0 text-decoration-none p-0"
						>
							<TbArrowBigUp className="info-icon" color={"white"} />
							<p className="p-0 m-0">{upvote}</p>
						</button>
						<button
							aria-label={`Comments, current count: ${comment}`}
							className="bg-primary-green-900 text-white d-flex flex-row justify-content-center align-items-center py-2 px-2 comment btn btn-link p-0 text-decoration-none p-0"
						>
							<MdInsertComment className="info-icon" color={"white"} />
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

export default PostItem;
