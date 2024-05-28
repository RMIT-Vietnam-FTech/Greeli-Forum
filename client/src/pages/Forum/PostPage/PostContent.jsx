import { useState, useEffect } from "react";
import axios from "axios";

import Avatar from "../../../components/Forum/Avatar";
import DropDown from "../../../components/Forum/DropDown";
import EditTextEditor from "../../../components/Forum/EditTextEditor/EditTextEditor";
import ImageOrVideo from "../../../components/Forum/ImageOrVideo";

import { AuthorizationContextProvider } from "../../../context/AuthorizationContext";
import { EditContextProvider } from "../../../context/EditContext";
import { useNavigate } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function PostContent({ postData }) {
  const [threadData, setTheadData] = useState();
  const navigate = useNavigate();

  const handleUserProfileRedirect = () => {
    navigate(`/user/${postData.createdBy.userId}`, { root: true });
  };
  const handleCommunityRedirect = () => {
    navigate(`/forum/communities/${postData.belongToThread}`, { root: true });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/v1/threads/${postData.belongToThread}`)
      .then((res) => {
        setTheadData(res.data);
      });
  }, []);
  return (
    <section className="w-100 position-relative">
      <EditContextProvider>
        <div className="w-100 d-flex">
          {/*post header*/}
          {/*----------------------------post header--------------------------------------------------------*/}
          <div className="d-flex gap-2 position-relative">
            {threadData ? (
              <div className="cursor-pointer" onClick={handleCommunityRedirect}>
                <Avatar size="lg" src={threadData.uploadFile.src} />
              </div>
            ) : (
              <Skeleton width="60px" height="60px" circle />
            )}
            <p
              className="mb-0 text-general-emphasis fw-bold cursor-pointer"
              onClick={handleCommunityRedirect}
            >
              {threadData ? threadData.title : <Skeleton />}
            </p>
            <li className="text-greeli-emphasis">
              {postData.isApproved
                ? dayjs().to(dayjs(postData.verifiedAt))
                : dayjs().to(dayjs(postData.createdAt))}
            </li>

            <p
              onClick={handleUserProfileRedirect}
              className="text-secondary position-absolute cursor-pointer"
              style={{ top: "25px", left: "70px" }}
            >
              {postData.createdBy.username}
            </p>
          </div>
          <AuthorizationContextProvider
            componentType="post"
            objectId={postData._id}
          >
            <DropDown
              componentType="post"
              postId={postData._id}
              threadId={postData.belongToThread}
            />
          </AuthorizationContextProvider>
        </div>
        {/*post body*/}
        <div className=" mt-3 w-100">
          <div
            tabIndex="0"
            className="fs-4 fw-bold text-login-emphasis"
            style={{ wordBreak: "break-word" }}
          >
            {postData.title}
          </div>

          {postData.uploadFile ? (
            <div
              className="w-100 my-4 bg-forum-subtle rounded-3 d-flex justify-content-center overflow-hidden"
              style={{ height: "400px" }}
            >
              <ImageOrVideo
                alt={postData.createdBy.username}
                uploadFile={postData.uploadFile}
                h100={true}
              />
            </div>
          ) : null}
          <EditTextEditor
            componentType="post"
            content={JSON.parse(postData.content)}
          />
        </div>
      </EditContextProvider>
    </section>
  );
}
