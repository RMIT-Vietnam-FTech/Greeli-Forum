import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import axios from "axios";

const PostGallery = (props) => {
	const isMe = props.isMe;
	const [profilePosts, setProfilePosts] = useState([props.profilePosts]);
	const [renderPostList, setRenderPostList] = useState(null);
	const token = JSON.parse(localStorage.getItem("user")).token;
	const userId = props.userId;
	// const userId = JSON.parse(localStorage.getItem("user")).id;

	console.log(profilePosts);

	const processPosts = (postObject) => {
		console.log(postObject);
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
			createdDate: createdDate,
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
		const fetchPath = ["created_posts", "archived_posts"];
		var newRenderPostList = [];
		const fetchPosts = async (fetchPath) => {
			const configuration = {
				method: "get",
				url: `http://localhost:3001/api/user/${userId}/${fetchPath}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			await axios(configuration)
				.then(async (response) => {
					const data = response.data;
					console.log(data);
					const processedData = await data.map((post) => processPosts(post));
					console.log(processedData);
					newRenderPostList.push(processedData);
				})
				.catch((error) => {
					console.log(error);
				});
			setProfilePosts(newRenderPostList);
		};
		const fetchPostsList = async () => {
			await fetchPosts("created_posts");
			await fetchPosts("archived_posts");
			console.log(profilePosts);
		};
		fetchPostsList();
	}, [userId, token]);

	const changeTabHandler = (event) => {
		const activeTab = document.querySelector(".post-tab-active");
		activeTab.classList.remove("post-tab-active");
		activeTab.classList.add("post-tab");
		event.target.classList.add("post-tab-active");
		event.target.classList.remove("post-tab");

		const clickedTabName = event.target.textContent;
		if (clickedTabName === "User's posts") {
			setRenderPostList(profilePosts[0]);
			console.log(profilePosts[0]);
		} else {
			setRenderPostList(profilePosts[1]);
			console.log(profilePosts[1]);
		}
		// console.log(profilePosts);
	};

	return (
		<div className="container">
			<div className="row text-white gap-5 fs-4 fw-light border-bottom border-white">
				<p
					className={`${isMe && "post-tab-active"} text-center col`}
					onClick={isMe ? changeTabHandler : null}
				>
					User's posts
				</p>
				{isMe && (
					<p className="post-tab text-center col" onClick={changeTabHandler}>
						Saved posts
					</p>
				)}
			</div>
			<div className="posts-container overflow-auto pt-3">
				{renderPostList?.length === 0 ? (
					<div className="text-white text-center">No posts to show</div>
				) : (
					renderPostList?.map((post, index) => {
						return <PostItem key={index} post={post} />;
					})
				)}
			</div>
		</div>
	);
};

export default PostGallery;
