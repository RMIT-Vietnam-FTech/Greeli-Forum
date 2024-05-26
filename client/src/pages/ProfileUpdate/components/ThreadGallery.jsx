import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import axios from "axios";

const ThreadGallery = (props) => {
	const isMe = props.isMe;
	const userId = props.userId;
	const token = JSON.parse(localStorage.getItem("user")).token;
	const [createdPosts, setCreatedPosts] = useState(null);
	const [archivedPosts, setArchivedPosts] = useState(null);
	const [renderPostList, setRenderPostList] = useState([1, 2, 3]);

	const demoPost = {
		postId: "1",
		author: {
			username: "author",
			profileImage:
				"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
		},
		comment: 1,
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est.",
		createdDate: "11-01-2023",
		threadId: "threadId",
		title: "Lorem ipsum dolor met",
		upvote: 1,
		uploadFile:
			"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
	};

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

	// useEffect(() => {
	// 	var newRenderPostList = [];
	// 	const fetchCreatedPosts = async () => {
	// 		const configuration = {
	// 			method: "get",
	// 			url: `http://localhost:3001/api/user/${userId}/created_posts`,
	// 		};
	// 		await axios(configuration)
	// 			.then(async (response) => {
	// 				const data = response.data;
	// 				const processedData = await data.map((post) => processPosts(post));
	// 				newRenderPostList = [...newRenderPostList, ...processedData];
	// 			})
	// 			.catch((error) => {
	// 				console.log(error);
	// 			});
	// 		setCreatedPosts(newRenderPostList);
	// 		setRenderPostList(newRenderPostList);
	// 		newRenderPostList = [];
	// 	};

	// 	const fetchArchivedPosts = async () => {
	// 		const configuration = {
	// 			method: "get",
	// 			url: `http://localhost:3001/api/user/${userId}/archived_posts`,
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 		};
	// 		await axios(configuration)
	// 			.then(async (response) => {
	// 				const data = response.data;
	// 				const processedData = await data.map((post) => processPosts(post));
	// 				newRenderPostList = [...newRenderPostList, ...processedData];
	// 			})
	// 			.catch((error) => {
	// 				console.log(error);
	// 			});
	// 		setArchivedPosts(newRenderPostList);
	// 	};

	// 	const fetchRenderPosts = async () => {
	// 		await fetchCreatedPosts();
	// 		await (isMe && fetchArchivedPosts());
	// 	};

	// 	fetchRenderPosts();
	// }, [userId]);

	const changeTabHandler = (event) => {
		const activeTab = document.querySelector(".post-tab-active");
		activeTab.classList.remove("post-tab-active");
		activeTab.classList.add("post-tab");
		event.target.classList.add("post-tab-active");
		event.target.classList.remove("post-tab");

		const clickedTabName = event.target.textContent;
		if (clickedTabName === "User's posts") {
			setRenderPostList(createdPosts);
			// console.log(renderPostList);
		} else {
			setRenderPostList(archivedPosts);
			// console.log(renderPostList);
		}
	};

	return (
		<div className="scroll overflow-y-auto p-0 mb-0 mt-4">
			{renderPostList?.length === 0 ? (
				<div className="text-greeli-emphasis text-center">No posts to show</div>
			) : (
				// renderPostList?.map((post, index) => {
				<>
					<PostItem post={demoPost} />
					<PostItem post={demoPost} />
					<PostItem post={demoPost} />
					<PostItem post={demoPost} />
				</>
				// })
			)}
		</div>
	);
};

export default ThreadGallery;
