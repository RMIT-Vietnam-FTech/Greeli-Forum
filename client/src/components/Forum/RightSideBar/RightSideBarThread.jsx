import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";
import Post from "../Post";
import Avatar from "../Avatar";
import ImageOrVideo from "../ImageOrVideo";

axios.defaults.withCredentials = true;

const fetcher = (url) => axios.get(url).then((res) => res.data);
const fetchPost = (url) => axios.get(url).then((res) => res.data.data);
export default function RightSideBarThread() {
  const matchWindowWidth = useMediaQuery("(min-width: 800px)");
  return (
    <div
      style={{ height: "95%" }}
      className={
        "w-100  gap-4 " +
        (matchWindowWidth && "d-flex flex-column-reverse overflow-scroll-y")
      }
    >
      <PostYouMayLike />
      <ThreadStatistic />
    </div>
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
      tabIndex="0"
      className="thread-statistic bg-forum-subtle"
      style={{ marginBottom: "23px" }}
    >
      <p className="text-primary-yellow fs-5" style={{ fontSize: "18px" }}>
        Thread statistic
      </p>
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
  const { ref, inView, entry } = useInView({
    threshold: 0,
    onChange: (inView, entry) => {
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
    <section tabIndex="0">
      <p className="ms-3 text-primary-yellow " style={{ fontSize: "18px" }}>
        Recommended Post
      </p>
      <div ref={ref} className="">
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
    <div
      style={{ height: "130px" }}
      className="d-flex flex-column justify-content-between border-bottom-gray py-3"
    >
      <div className="w-100">
        {/*left sidebar*/}
        <div className="w-75">
          {/*user info*/}
          <div className="d-flex gap-2 mb-2">
            {/*avatar*/}
            <Avatar src={postData.createdBy.profileImage} size="sm" />

            {/*user username*/}
            <div className="text-primary-yellow" style={{ fontSize: "14px" }}>
              {postData.createdBy.username}
            </div>
          </div>

          <Link
            to={`http://localhost:3000/forum/threads/${postData.belongToThread}/posts/${postData._id}`}
            className=""
          >
            <h4
              style={{
                wordBreak: "break-word",
                fontSize: "14px",
                color: "#6b8177",
              }}
            >
              {postData.title}
            </h4>
          </Link>
        </div>
      </div>
      {/*number of like and comment*/}
      <div
        className="d-flex gap-2 "
        style={{ fontSize: "12px", color: "gray" }}
      >
        <p className="m-0 p-0">{postData.upvoteLength} upvotes</p>
        <p className="m-0 p-0">{postData.commentLength} comments</p>
      </div>
    </div>
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
