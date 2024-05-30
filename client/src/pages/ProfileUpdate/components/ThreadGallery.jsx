import axios from "axios";
import { useEffect, useState } from "react";
import ThreadItem from "./ThreadItem";

const ThreadGallery = (props) => {
	// const demoPost = {
	// 	postId: "1",
	// 	author: {
	// 		username: "author",
	// 		profileImage:
	// 			"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
	// 	},
	// 	comment: 1,
	// 	content:
	// 		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est.",
	// 	createdDate: "11-01-2023",
	// 	threadId: "threadId",
	// 	title: "Lorem ipsum dolor met",
	// 	upvote: 1,
	// 	uploadFile:
	// 		"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
	// };
	const { renderPostList } = props;
	// console.log(renderPostList);

	return (
		<div className="scroll overflow-y-auto p-0 mb-0 mt-4">
			{renderPostList?.length === 0 ? (
				<div className="text-greeli-emphasis text-center">
					No posts to show
				</div>
			) : (
				renderPostList?.map((post, index) => {
					return <ThreadItem key={index} post={post} />;
					// <>
					// 	<PostItem post={demoPost} />
					// 	<PostItem post={demoPost} />
					// 	<PostItem post={demoPost} />
					// 	<PostItem post={demoPost} />
					// </>
				})
			)}
		</div>
	);
};

export default ThreadGallery;
