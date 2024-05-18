import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
    `/api/v1/posts/${postId}`,
    fetcher
  );
  if (error) {
    return <div>is error</div>;
  }
  if (isLoading) {
    return <div>is loading</div>;
  }
  return <PostPageStructure postData={data} />;
}
function PostPageStructure({ postData }) {
  const navigate = useNavigate();
  const { data, error, isLoading } = useSwr(
    `/api/v1/threads/${postData.belongToThread}`,
    fetcher
  );
  if (error) {
    return 0;
  }
  if (isLoading) {
    return 0;
  }
  if (
    data.createdBy.userId == JSON.parse(localStorage.getItem("user")).id ||
    postData.createdBy.userId == JSON.parse(localStorage.getItem("user")).id ||
    postData.isApproved
  ) {
    return (
      <section className="container">
        <section className="left-sidebar">
          {localStorage.getItem("user") ? <AuthLeftSideBar /> : <LeftSideBar />}
        </section>
        <section className="main-container">
          <section className="main">
            <InitialPost postData={postData} />
            <Comments
              postData={postData}
              threadAdminId={data.createdBy.userId}
            />
          </section>
          <section className="right-sidebar"></section>
        </section>
      </section>
    );
  } else {
    navigate("/forum");
  }
}
