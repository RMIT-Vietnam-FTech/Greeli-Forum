import "../forum.scss";
import axios from "axios";
import useSWR from "swr";
import { json, useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function PostPage() {
  const { postId } = useParams();
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
  if (data.isApproved) {
    return (
      <section className="container">
        <section className="left-sidebar"></section>
        <section className="main-container">
          <section className="main">
            <PostHeader
              title={data.title}
              content={data.content}
              uploadFile={data.uploadFile}
              username={data.createBy.username}
              profileImage={data.createBy.profileImage}
              threadName={data.threadName}
              upvote={data.upvote}
              objectId = {postId}
            />
            <PostBody/>
          </section>
          <section className="right-sidebar"></section>
        </section>
      </section>
    );
  }
  return <></>;
}
