import "../scss/custom.css";
import axios from "axios";
import useSWR from "swr";
import ImageOrVideo from "./ImageOrVideo";
import { Link } from "react-router-dom";
const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function Post({ postId }) {
  const { data, error, isLoading } = useSWR(
    "http://localhost:9000/posts/" + postId,
    fetcher
  );
  if (error) {
    return 0;
  }
  if (isLoading) {
    return 0;
  }
  console.log("postId: " + postId);
  console.log("post data: " + data.postUpload);
  return (
    <Link
      to={"../posts/"+postId}
      className="mt-4 w-100 p-4 bg-primary-900 text-white text-decoration-none d-flex gap-2 justify-content-between position-relative overflow-hidden bg-primary-green-600 rounded-5"
    >
      <div className="w-75">
        <div className="d-flex gap-2">
            <Avatar src={data.createBy.profileImage}/> 
        </div>
        <p>{data.content}</p>
      </div>
      <div className="w-25 rounded-3 d-flex justify-content-center bg-primary-green-900 overflow-hidden " style={{height:"150px"}}>
        <ImageOrVideo src={data.postUpload} />
      </div>
    </Link>
  );
}
function Avatar({src}) {
    console.log("src: "+src);
  return (
    <div
      className="rounded-circle"
      style={{
        width: "60px",
        height: "60px",
        backgroundColor: "gray",
        backgroundImage: "url(" + {src} + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    />
  );
}
