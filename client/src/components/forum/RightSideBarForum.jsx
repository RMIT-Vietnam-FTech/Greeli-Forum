import useSWR from "swr";
import axios from "axios";
import Avatar from "./Avatar";
const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function RightSideBarForum() {
	return (
		<>
			<ForumLeaderBoard />
			<ForumStatistic />
		</>
	);
}

function ForumStatistic() {
	const path = `http://localhost:3001/api/v1/forums/statistic`;
	const { data, error, isLoading } = useSWR(path, fetcher);
	if (isLoading) {
		return 0;
	}
	return (
		<div
			className="w-100  p-3 bg-forum-subtle d-flex flex-column align-items-start"
			style={{ borderRadius: "20px" }}
		>
			<div className="text-primary-yellow fs-5 mb-3">Forum Statistic</div>
			<div className="w-100">
				<p className="text-white w-100 d-flex justify-content-between">
					<b className="w-50">Threads</b>{" "}
					<span className="ms-3 w-50">{data.thread}</span>
				</p>
				<p className="text-white w-100 d-flex justify-content-between">
					<b className="w-50">Posts</b>{" "}
					<span className="ms-3 w-50">{data.post}</span>
				</p>
				<p className="text-white w-100 d-flex justify-content-between">
					<b className="w-50">Members</b>{" "}
					<span className="ms-3 w-50">{data.user}</span>
				</p>
			</div>
		</div>
	);
}

function ForumLeaderBoard() {
	const path = `http://localhost:3001/api/v1/forums/leaderboard`;
	const { data, error, isLoading } = useSWR(path, fetcher);
	if (isLoading) {
		return 0;
	}
	return (
		<div
			className="mt-4 w-100 bg-forum-subtle d-flex flex-column gap-2 align-items-start overflow-scroll-y h-75"
			style={{ borderRadius: "20px" }}
		>
			{data.map((leadeboard, index) => {
				return (
					<div
						key={leadeboard._id}
						className="w-100 d-flex align-items-center py-2 justify-content-between text-white"
					>
						<div
							className="ms-2 d-flex gap-2 align-items-center justify-content-between"
							style={{ width: "30%" }}
						>
							<Avatar src={leadeboard.profileImage} />
							<div>{index + 1}</div>
						</div>
						<div style={{ fontSize: "12px", width: "60%" }}>
							{leadeboard.username}
						</div>
					</div>
				);
			})}
		</div>
	);
}
