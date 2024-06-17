import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProfileContext } from "../../../context/ProfileContext";
import ThreadGallery from "./ThreadGallery";

const RightSidePart = (props) => {
	const { isMe, comments } = props;
	const [tab, setTab] = useState("Created Threads");
	let { userId } = useParams();
	userId =
		userId !== undefined
			? userId
			: JSON.parse(localStorage.getItem("user")).id;
	// const savedPosts = data.archivedPost;
	// console.log(createdPost, archivedPost);
	const token = JSON.parse(localStorage.getItem("user")).token;
	const [createdPosts, setCreatedPosts] = useState(null);
	const [savedPosts, setSavedPosts] = useState(null);
	const [renderPostList, setRenderPostList] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
		console.log(userId);
	}, [process.env.NODE_ENV]);

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

		const upvote = postObject.upvote?.length;
		const comment =
			tab === "Created Threads"
				? postObject.comments?.length
				: postObject.replies?.length;

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

	// PROCESS FETCHED POSTS
	// console.log(comments.data);
	const fetchedPosts = comments?.data?.map((comment) =>
		processPosts(comment),
	);

	useEffect(() => {
		var newRenderPostList = [];
		const fetchCreatedPosts = async () => {
			const configuration = {
				method: "get",
				url: baseUrl + `/api/user/${userId}/created_posts`,
			};
			await axios(configuration)
				.then(async (response) => {
					const data = response.data;
					const processedData = await data.map((post) =>
						processPosts(post),
					);
					newRenderPostList = [
						...newRenderPostList,
						...processedData,
					];
					setIsLoading(false);
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
				url: baseUrl + `/api/user/${userId}/saved_posts`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			await axios(configuration)
				.then(async (response) => {
					const data = response.data;
					const processedData = await data.map((post) =>
						processPosts(post),
					);
					newRenderPostList = [
						...newRenderPostList,
						...processedData,
					];
				})
				.catch((error) => {
					console.log(error);
				});
			setSavedPosts(newRenderPostList);
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
					<h1 className="mt-5 profile-title text-greeli-emphasis">
						Thread Gallery
					</h1>

					{/* DROPDOWN */}
					<div className="dropdown position-static d-flex flex-row justify-content-end">
						<button
							className="btn btn-primary-green dropdown-toggle theme-button"
							type="button"
							id="dropdownMenuButton1"
							data-bs-toggle="dropdown"
							aria-expanded="false"
							style={{ width: "200px" }}
						>
							{tab}{" "}
						</button>
						<ul
							className="dropdown-menu"
							aria-labelledby="dropdownMenuButton1"
							style={{ width: "200px" }}
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
										setTab("Created Posts");
										setRenderPostList(fetchedPosts);
									}}
								>
									Created Posts
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<ThreadGallery
					renderPostList={renderPostList}
					isLoading={isLoading}
					tab={tab}
				/>
			</div>
		</div>
	);
};
export default RightSidePart;
