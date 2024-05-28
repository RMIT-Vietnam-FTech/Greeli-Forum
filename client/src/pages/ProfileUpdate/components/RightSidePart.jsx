import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ThreadGallery from "./ThreadGallery";
import { useProfileContext } from "../../../context/ProfileContext";

const RightSidePart = (props) => {
	const { isMe } = props;
	const [tab, setTab] = useState("Created Threads");
	const data = useProfileContext();
	const { createdPost, archivedPost, userId } = data;
	// console.log(createdPost, archivedPost);
	const token = JSON.parse(localStorage.getItem("user")).token;
	const [createdPosts, setCreatedPosts] = useState(null);
	const [archivedPosts, setArchivedPosts] = useState(null);
	const [renderPostList, setRenderPostList] = useState(null);

	const processPosts = (postObject) => {
		// console.log(postObject);
		const postId = postObject._id;
		const title = postObject.title;
		const { username, userId, uploadFile } = postObject.createdBy;
		const profileImage = postObject.createdBy.profileImage || "";
		const createdDate = postObject.createdAt;

		const content = JSON.parse(postObject["content"])["content"][0][
			"content"
		][0]["text"];

		const upvote = postObject.upvote.length;
		const comment = postObject.comments.length;

		const threadId = postObject.belongToThread;

		const showPostObject = {
			postId: postId,
			author: {
				username: username,
				userId: userId,
				profileImage: profileImage,
			},
			createdDate: createdDate.substring(0, 10),
			threadId: threadId,
			title: title,
			content: content,
			upvote: upvote,
			comment: comment,
			uploadFile: uploadFile,
		};
		return showPostObject;
	};

	useEffect(() => {
		var newRenderPostList = [];
		const fetchCreatedPosts = async () => {
			const configuration = {
				method: "get",
				url: `http://localhost:3001/api/user/${userId}/created_posts`,
			};
			await axios(configuration)
				.then(async (response) => {
					const data = response.data;
					const processedData = await data.map((post) => processPosts(post));
					newRenderPostList = [...newRenderPostList, ...processedData];
				})
				.catch((error) => {
					console.log(error);
				});
			setCreatedPosts(newRenderPostList);
			setRenderPostList(newRenderPostList);
			newRenderPostList = [];
		};

		const fetchArchivedPosts = async () => {
			const configuration = {
				method: "get",
				url: `http://localhost:3001/api/user/${userId}/archived_posts`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			await axios(configuration)
				.then(async (response) => {
					const data = response.data;
					const processedData = await data.map((post) => processPosts(post));
					newRenderPostList = [...newRenderPostList, ...processedData];
				})
				.catch((error) => {
					console.log(error);
				});
			setArchivedPosts(newRenderPostList);
		};

		const fetchRenderPosts = async () => {
			await fetchCreatedPosts();
			await (isMe && fetchArchivedPosts());
		};

		fetchRenderPosts();
	}, [userId]);

	return (
		<div className="col-12 col-lg-9 h-lg-50 h-100 px-lg-5 px-0">
			<div className="d-flex flex-column ms-5 ms-lg-0 me-5 me-lg-0 h-lg-50 h-100">
				<div>
					<h1 className="mt-5 profile-title">Thread Gallery</h1>

					{/* DROPDOWN */}
					<div className="dropdown position-static d-flex flex-row justify-content-end">
						<button
							className="btn btn-primary-green dropdown-toggle"
							type="button"
							id="dropdownMenuButton1"
							data-bs-toggle="dropdown"
							aria-expanded="false"
							style={{ width: "160px" }}
						>
							{tab}{" "}
						</button>
						<ul
							className="dropdown-menu"
							aria-labelledby="dropdownMenuButton1"
							style={{ width: "160px" }}
						>
							<li>
								<Link
									className="dropdown-item"
									onClick={() => {
										setTab("Created Threads");
										setRenderPostList(createdPosts);
									}}
								>
									Created Threads
								</Link>
							</li>
							<li>
								<Link
									className="dropdown-item"
									onClick={() => {
										setTab("Archieved Threads");
										setRenderPostList(archivedPosts);
									}}
								>
									Archieved Threads
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<ThreadGallery renderPostList={renderPostList} />
			</div>
		</div>
	);
};
export default RightSidePart;
