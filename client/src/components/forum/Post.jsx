import axios from "axios";
import { Link } from "react-router-dom";
import useSwr from "swr";
import Avatar from "./Avatar";
import DropDownPost from "./DropDown";
import ImageOrVideo from "./ImageOrVideo";
const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function Post({ postId }) {
	const { data, error, isLoading } = useSwr(
		`http://localhost:9000/api/v1/posts/${postId}`,
		fetcher,
	);
	if (error) {
		return 0;
	}
	if (isLoading) {
		return 0;
	}
	return (
		<div className="w-100 position-relative d-flex justify-content-center bg-primary-green-600 my-4 px-5 py-3 rounded-3">
			<Link
				to={"../posts/" + postId}
				className="w-100 d-flex gap-2 justify-content-between align-items-center bg-primary-900 text-white text-decoration-none  "
			>
				<div className="w-75 d-flex flex-column justify-content-between">
					<div className="d-flex gap-2">
						<Avatar src={data.createBy.profileImage} />
						<div className="h-auto">
							<p className="mb-0 text-primary-yellow-400 fw-bold">
								thread/{data.threadName}
							</p>
							<p className="mb-0">{data.createBy.username}</p>
						</div>
					</div>
					<p className="fw-bold">{data.title}</p>
				</div>
				<div
					className=" w-25 d-flex justify-content-center bg-primary-green-900 rounded-3 overflow-hidden "
					style={{ height: "100px" }}
				>
					<ImageOrVideo src={data.uploadFile} isPost={true} />
				</div>
			</Link>
		</div>
	);
}
