import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";
import Post from "../../pages/Forum/PostPage/components/Post";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const fetchPost = (url) => axios.get(url).then((res) => res.data.data);
export default function RightSideBarThread() {
	return (
		<>
			<PostYouMayLike />
			<ThreadStatistic />
		</>
	);
}

function ThreadStatistic() {
	const { threadId } = useParams();
	const path = `/api/v1/threads/${threadId}/statistic`;
	const { data, error, isLoading } = useSWR(path, fetcher);
	if (isLoading) {
		return 0;
	}
	return (
		<div className="thread-statistic bg-forum-subtle">
			<div className="text-primary-yellow fs-5 mb-3">
				Thread statistic
			</div>
			<div className="w-75">
				<p className="text-white w-100 d-flex justify-content-between">
					<b className="w-50">Posts</b>{" "}
					<span className="ms-3 w-50">{data.post}</span>
				</p>
				<p className="text-white w-100 d-flex justify-content-between">
					<b className="w-50">Members</b>{" "}
					<span className="ms-3 w-50">{data.member}</span>
				</p>
				<p className="text-white w-100 d-flex justify-content-between">
					<b className="w-50">Admin</b>{" "}
					<span className="ms-3 w-50" style={{ color: "#33FF00" }}>
						{data.admin.username}
					</span>
				</p>
			</div>
		</div>
	);
}

export function PostYouMayLike() {
	const matchWindowWidth = useMediaQuery("(min-width: 800px)");
	console.log(`check window width: ${matchWindowWidth}`);
	const { ref, inView, entry } = useInView({
		threshold: 0,
		onChange: (inView, entry) => {
			// console.log(`check size: ${size}\n check limit: ${limit}\n check total: ${total}`)
			if (inView && size * 10 <= 11) {
				setSize(size + 1);
			}
		},
	});

	const { data, mutate, size, setSize, isValidating, isLoading } =
		useSWRInfinite(
			(index, prevData) =>
				prevData && !prevData.length
					? null
					: `/api/v1/posts?page=${
							index + 1
						}&sort=${"Hot"}`,
			fetchPost,
		);

	if (isLoading) {
		return 0;
	}

	const issues = data ? [].concat(...data) : [];

	return (
		<section
			className={
				"recommend-post-wrapper " +
				(matchWindowWidth ? "bg-forum-subtle mt-0" : null)
			}
		>
			<h3 className="text-primary-yellow right-side-bar-heading">
				Recommended Post
			</h3>
			<div ref={ref} className="recommend-post-section">
				{/*Recommend post items*/}
				{issues.map((postData) => {
					return matchWindowWidth ? (
						<RecommendPost key={postData._id} postData={postData} />
					) : (
						<Post key={postData._id} postData={postData} />
					);
				})}
			</div>
		</section>
	);
}

const RecommendPost = ({ postData }) => {
	// console.log(`check data: ${postData._id}`)
	return (
		<Link
			to={`/forum/threads/${postData.belongToThread}/posts/${postData._id}`}
			className="recommend-post"
		>
			{/*user info*/}
			<div className="d-flex gap-2">
				{/*avatar*/}
				<div
					className="rounded-circle overflow-hidden bg-secondary"
					style={{ width: "30px", height: "30px" }}
				>
					{postData.createdBy.profileImage ? (
						<img
							className="w-100 h-100"
							src={postData.createdBy.profileImage}
						/>
					) : null}
				</div>

				{/*user username*/}
				<div
					className="right-side-bar-username"
					style={{ fontSize: "14px" }}
				>
					{postData.createdBy.username}
				</div>
			</div>

			<p
				className="right-side-bar-title"
				style={{ wordBreak: "break-word" }}
			>
				{postData.title}
			</p>

			{/*number of like and comment*/}
			<div className="d-flex gap-2 ">
				<p className="m-0 p-0 right-side-bar-contact">
					{postData.upvoteLength} upvotes
				</p>
				<p className="m-0 p-0 right-side-bar-contact">
					{postData.commentLength} comments
				</p>
			</div>
		</Link>
	);
};

export function useMediaQuery(mediaQueryString) {
	const queryString = removeReservedMediaKeyWord(mediaQueryString);
	const query = useMemo(() => window.matchMedia(queryString), [queryString]);
	const [matches, setMatches] = useState(query.matches); // one-time, instantaneous check
	useEffect(() => {
		const listener = (e) => setMatches(e.matches);
		query.addEventListener("change", listener);
		return () => query.removeEventListener("change", listener);
	}, [query]);
	return matches;
}
function removeReservedMediaKeyWord(mediaQueryString) {
	return mediaQueryString.replace("@media", "").trim();
}
