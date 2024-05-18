import { useState } from "react";
import PostItem from "./PostItem";

const PostGallery = (props) => {
	const { myPosts, savedPosts } = props.profilePosts;
	const [renderPostList, setRenderPostList] = useState(myPosts);

	const changeTabHandler = (event) => {
		document
			.querySelector(".post-tab-active")
			.classList.remove("post-tab-active");
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
		<div className="mt-5">
			<div className="d-flex flex-row text-white gap-5 fs-4 fw-light border-bottom border-white">
				<p className="post-tab-active" onClick={changeTabHandler}>
					User's posts
				</p>
				<p className="" onClick={changeTabHandler}>
					Saved posts
				</p>
			</div>
			<div className="posts-container overflow-auto">
				{renderPostList.map((post, index) => {
					return <PostItem key={index} post={post} />;
				})}
			</div>
		</div>
	);
};

export default PostGallery;
