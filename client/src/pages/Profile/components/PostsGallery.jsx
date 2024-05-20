import { useState } from "react";
import PostItem from "./PostItem";

const PostGallery = (props) => {
	const { myPosts, savedPosts } = props.profilePosts;
	const isMe = props.isMe;
	const [renderPostList, setRenderPostList] = useState(myPosts);

	const changeTabHandler = (event) => {
		const activeTab = document.querySelector(".post-tab-active");
		activeTab.classList.remove("post-tab-active");
		activeTab.classList.add("post-tab");
		event.target.classList.add("post-tab-active");
		event.target.classList.remove("post-tab");

		const clickedTabName = event.target.textContent;
		if (clickedTabName === "My posts") {
			setRenderPostList(myPosts);
		} else {
			setRenderPostList(savedPosts);
		}
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
				{isMe && (
					<p className="post-tab text-center col" onClick={changeTabHandler}>
						Saved Threads
					</p>
				)}
			</div>
			<div className="posts-container overflow-auto pt-3">
				{renderPostList.map((post, index) => {
					return <PostItem key={index} post={post} />;
				})}
			</div>
		</div>
	);
};

export default PostGallery;
