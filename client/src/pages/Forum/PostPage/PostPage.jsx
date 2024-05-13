import axios from "axios";
import { useParams } from "react-router-dom";
import useSwr from "swr";
import "../assets/forum.scss";

import { CommentContextProvider } from "../../../context/CommentContext";
import Comments from "./Comments";
import InitialPost from "./IntialPost";
const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function PostPage() {
	const { postId } = useParams();
	const { data, error, isLoading } = useSwr(
		"http://localhost:9000/api/v1/posts/" + postId,
		fetcher,
	);
	if (error) {
		return <div>is error</div>;
	}
	if (isLoading) {
		return <div>is loading</div>;
	}
	if (data.isApproved) {
		return (
			<section className="container">
				<section className="left-sidebar"></section>
				<section className="main-container">
					<section className="main">
						<InitialPost postData={data} />
						<Comments />
					</section>
					<section className="right-sidebar"></section>
				</section>
			</section>
		);
	}
	return <></>;
}
