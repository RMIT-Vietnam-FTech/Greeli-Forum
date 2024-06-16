import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import useSwr from "swr";
import PostList from "./ThreadPage/PostList";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function TopicPage() {
	const { topicId } = useParams();
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	});
	const path = baseUrl + `/api/v1/topics/${topicId}`;
	const navigate = useNavigate();
	const { data, error, isLoading } = useSwr(path, fetcher);
	if (error) {
		navigate("/404");
	}
	if (isLoading) {
		return 1;
	}
	console.log(data);
	return <PostList topicData={data} />;
}
