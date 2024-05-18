import { Link, useParams } from "react-router-dom";
import axios from "axios";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const fetchPost = (url) => axios.get(url).then((res) => res.data.data);
export default function RightSideBarThread() {
  return (
    <section className="d-flex flex-column justify-content-between h-100">
      <ThreadStatistic />
      <PostYouMayLike />
    </section>
  );
}

function ThreadStatistic() {
  const { threadId } = useParams();
  const path = `http://localhost:3001/api/v1/threads/${threadId}/statistic`;
  const { data, error, isLoading } = useSWR(path, fetcher);
  if (isLoading) {
    return 0;
  }
  return (
    <div
      className="w-100 bg-primary-green px-3 py-3 d-flex flex-column align-items-start"
      style={{ borderRadius: "20px" }}
    >
      <div className="text-primary-yellow fs-5 mb-3">Thread statistic</div>
      <div className="w-100">
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
  const { ref, inView, entry } = useInView({
    threshold: 0,
    onChange: (inView, entry) => {
      // console.log(`check size: ${size}\n check limit: ${limit}\n check total: ${total}`)
      if (inView && size * 10 <= 20) {
        setSize(size + 1);
      }
    },
  });

  const { data, mutate, size, setSize, isValidating, isLoading } =
    useSWRInfinite(
      (index, prevData) =>
        prevData && !prevData.length
          ? null
          : `http://localhost:3001/api/v1/posts?page=${
              index + 1
            }&sort=${"Hot"}`,
      fetchPost
    );

  if (isLoading) {
    return 0;
  }

  const issues = data ? [].concat(...data) : [];

  return (
    <>
      <section
        ref={ref}
        className="recommend-post-section"
        style={{ borderRadius: "20px", wordBreak: "break-word" }}
      >
        <p className="text-primary-yellow" style={{fontSize:"18px"}}>Recommended Post</p>
        {/*Recommend post items*/}
        {issues.map((postData) => {
          return <RecommendPost key={postData._id} postData={postData} />;
        })}
      </section>
    </>
  );
}

const RecommendPost = ({ postData }) => {
  // console.log(`check data: ${postData._id}`)
  return (
    <Link
      to={`http://localhost:3000/forum/threads/${postData.belongToThread}/posts/${postData._id}`}
      className="w-100 d-flex flex-column gap-2 align-items-start py-4 justify-content-between border-bottom"
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
        <div className="text-white" style={{ fontSize: "14px" }}>
          {postData.createdBy.username}
        </div>
      </div>

      <p
        className="fw-bold text-primary-green-200 m-0"
        style={{ fontSize: "14px", wordBreak: "break-word" }}
      >
        {postData.title}
      </p>

      {/*number of like and comment*/}
      <div className="d-flex gap-2 text-white">
        <p className="m-0" style={{fontSize:"12px"}}>{postData.upvoteLength} upvotes</p>
        <p className="m-0" style={{fontSize:"12px"}}>{postData.commentLength} comments</p>
      </div>
    </Link>
  );
};
