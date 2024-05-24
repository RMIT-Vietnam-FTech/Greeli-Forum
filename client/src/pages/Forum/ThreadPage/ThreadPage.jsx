import React from "react";
import { useParams } from "react-router-dom";


import axios from "axios";
import useSwr from "swr";

import PostList from "./PostList"
import ThreadContent from "./ThreadContent";
axios.defaults.withCredentials = true;

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function ThreadPage() {
	const { threadId } = useParams();
	const path = `/api/v1/threads/${threadId}`;
	const { data, error, isLoading } = useSwr(path, fetcher);

	if (error) {
		return <div>is error</div>;
	}
	
	if (isLoading) {
		return <div>is loading</div>;
	}

	return (
		<>
			<ThreadContent
				title={data.title}
				uploadFile={data.uploadFile}
				content={data.content}
				objectId={data._id}
				createdBy={data.createdBy}
			/>
			<PostList threadData={data} />
		</>
	);
}
