import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSwr from "swr";
import "../assets/forum.scss";
import PostComment from "./PostComment";
import PostContent from "./PostContent";

import PostPageSkeleton from "../../../components/Forum/Skeleton/PostPageSkeleton";

const fetcher = (url) => axios.get(url).then((res) => res.data);
axios.defaults.withCredentials = true;

export default function PostPage() {
	const { postId } = useParams();
	const navigate = useNavigate();
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	});
	const { data, error, isLoading } = useSwr(
		baseUrl + `/api/v1/posts/${postId}`,
		fetcher,
	);
	if (error) {
		navigate("/404");
	}
	if (isLoading) {
		return <></>;
	}
	return <PostPageStructure postData={data} />;
}
function PostPageStructure({ postData }) {
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	});
	const navigate = useNavigate();
	const user = localStorage.getItem("user");
	const { data, error, isLoading } = useSwr(
		postData
			? baseUrl + `/api/v1/threads/${postData.belongToThread}`
			: null,
		fetcher,
	);
	if (error) {
		navigate("/404");
	}
	if (isLoading) {
		return <PostPageSkeleton />;
	}
	if (
		postData &&
		(postData.isApproved ||
			(user &&
				(data.createdBy.userId == JSON.parse(user).id ||
					postData.createdBy.userId == JSON.parse(user).id)))
	) {
		return (
			<>
				{postData && <PostContent postData={postData} />}
				{postData && (
					<PostComment
						postData={postData}
						threadAdminId={data.createdBy.userId}
					/>
				)}
			</>
		);
	} else {
		navigate("/forum");
	}
}
