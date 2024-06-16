import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import useSwr from "swr";

import ThreadContent from "./ThreadContent";
import PostList from "./PostList";
import ThreadContentSkeleton from "../../../components/Forum/Skeleton/ThreadContentSkeleton";
axios.defaults.withCredentials = true;

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function ThreadPage() {
	const { threadId } = useParams();
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	});
	const path = baseUrl + `/api/v1/threads/${threadId}`;
	const navigate = useNavigate();
	const { data, error, isLoading } = useSwr(path, fetcher);

	if (error) {
		navigate("/404");
	}

	if (isLoading) {
		// return <div>is loading</div>;
		return <ThreadContentSkeleton />;
	}

	return (
		<>
			{data && (
				<ThreadContent
					title={data.title}
					uploadFile={data.uploadFile}
					content={data.content}
					objectId={data._id}
					createdBy={data.createdBy}
				/>
			)}
			{data && <PostList threadData={data} />}
		</>
	);
}
