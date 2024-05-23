import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useSwr from "swr";
import "../assets/forum.scss";
import Comments from "./Comments";
import InitialPost from "./IntialPost";
const fetcher = (url) => axios.get(url).then((res) => res.data);
axios.defaults.withCredentials = true;

export default function PostPage() {
	const { postId } = useParams();
	const { data, error, isLoading } = useSwr(
		`http://localhost:3001/api/v1/posts/${postId}`,
		fetcher,
	);
	if (error) {
		return <div>is error</div>;
	}
	if (isLoading) {
		return <div>is loading</div>;
	}
	return <PostPageStructure postData={data} />;
}
function PostPageStructure({ postData }) {
	const navigate = useNavigate();
	const { data, error, isLoading } = useSwr(
		`http://localhost:3001/api/v1/threads/${postData.belongToThread}`,
		fetcher,
	);
	if (error) {
		return 0;
	}
	if (isLoading) {
		return 0;
	}
	if (
		postData.isApproved ||
		(localStorage.getItem("user") !== "null" &&
			(data.createdBy.userId ==
				JSON.parse(localStorage.getItem("user")).id ||
				postData.createdBy.userId ==
					JSON.parse(localStorage.getItem("user")).id))
	) {
		return (
			<>
				<InitialPost postData={postData} />
				<Comments
					postData={postData}
					threadAdminId={data.createdBy.userId}
				/>
			</>
		);
	} else {
		navigate("/forum");
	}
}
