import axios from "axios";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import Avatar from "../../components/Avatar";
import DropDownPost from "../../components/DropDownPost";
import ImageOrVideo from "../../components/ImageOrVideo";
import ButtonUpvote from "./components/ButtonUpvote";
const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function PostHeader({ postId }) {
  const { data, error, isLoading } = useSWR(
    "http://localhost:9000/api/v1/posts/" + postId,
    fetcher
  );
  if (error) {
    return 0;
  }
  if (isLoading) {
    return 0;
  }
  return (
    <section className="w-100 position-relative">
      <div className="w-100 d-flex">
        <div className="d-flex gap-2">
          <Avatar src={data.createBy.profileImage} />
          <div className="h-auto">
            <p className="mb-0 text-primary-green-900 fw-bold">
              thread/{data.threadName}
            </p>
            <p className="mb-0">{data.createBy.username}</p>
          </div>
        </div>
        <DropDownPost isAdmin={false} isCreator={true} flexColumn={false} />
      </div>

      <div className=" my-3 w-100">
        <h3>{data.title}</h3>
        <div
          className="w-100 my-4 bg-primary-green-600 rounded-3 d-flex justify-content-center overflow-hidden"
          style={{ height: "400px" }}
        >
          <ImageOrVideo src={data.uploadFile} />
        </div>
        <p>{data.content}</p>
      </div>
      <div className="d-flex gap-3">
        <ButtonUpvote upVote={data.upVote} />
      </div>
    </section>
  );
}

