import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import useSwr from "swr";

import SearchBar from "../../../components/Search/Search";
import PostList from "./PostList";
import ThreadContent from "./ThreadContent";
axios.defaults.withCredentials = true;

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function ThreadPage() {
	const { threadId } = useParams();
	const path = `http://localhost:3001/api/v1/threads/${threadId}`;
	const navigate = useNavigate();
	const { data, error, isLoading } = useSwr(path, fetcher);

	if (error) {
		navigate("/404");
	}

	if (isLoading) {
		return <div>is loading</div>;
	}
	if (data) {
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
