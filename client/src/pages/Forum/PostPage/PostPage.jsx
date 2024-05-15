import axios from "axios";
import { useParams } from "react-router-dom";
import useSwr from "swr";
import "../assets/forum.scss";
import AuthLeftSideBar from "../../../components/forum/AuthLeftSideBar";
import LeftSideBar from "../../../components/forum/EditTextEditor/LeftSideBar";
import { CommentContextProvider } from "../../../context/CommentContext";
import Comments from "./Comments";
import InitialPost from "./IntialPost";
const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function PostPage() {
  const { postId } = useParams();
  const { data, error, isLoading } = useSwr(
    `http://localhost:3001/api/v1/posts/${postId}`,
    fetcher
  );
  if (error) {
    return <div>is error</div>;
  }
  if (isLoading) {
    return <div>is loading</div>;
  }
//   if (data.isApproved) {
    return (
      <section className="container">
        <section className="left-sidebar">
          {localStorage.getItem("user") ? <AuthLeftSideBar /> : <LeftSideBar />}
        </section>
        <section className="main-container">
          <section className="main">
            <InitialPost postData={data} />
            <Comments />
          </section>
          <section className="right-sidebar"></section>
        </section>
      </section>
    );
//   }
//   return <></>;
}
