import "../scss/custom.css";
import axios from "axios";
import useSWR from "swr";
import ImageOrVideo from "./ImageOrVideo";
import Avatar from "./Avatar";
import DropDownPost from "./DropDownPost";
import { Link } from "react-router-dom";
const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function Post({ postId }) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:9000/api/v1/posts/${postId}`,
    fetcher
  );
  if (error) {
    return 0;
  }
  if (isLoading) {
    return 0;
  }
  return (
    <div className="my-4 px-5 py-3 d-flex justify-content-center w-100 position-relative bg-primary-green-600 rounded-3">
        <DropDownPost isAdmin={false} isCreator={false} inPost={true}/>
      <Link
        to={"../posts/" + postId}
        className="w-100 bg-primary-900 text-white text-decoration-none d-flex gap-2 justify-content-between align-items-center "
      >
        <div className="w-75 d-flex flex-column justify-content-between">
          <div className="d-flex gap-2">
            <Avatar src={data.createBy.profileImage} />
            <div className="h-auto">
                <p className="mb-0 text-primary-yellow-400 fw-bold">thread/{data.threadName}</p>
                <p className="mb-0">{data.createBy.username}</p>
            </div>
          </div>
          <p className="fw-bold">{data.title}</p>
        </div>
        <div
          className=" w-25 rounded-3 d-flex justify-content-center bg-primary-green-900 overflow-hidden "
          style={{ height: "100px" }}
        >
          <ImageOrVideo src={data.uploadFile} isPost={true}/>
        </div>
      </Link>
    </div>
  );
}


