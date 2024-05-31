import axios from "axios";
import { useEffect, useState } from "react";

import Avatar from "../../../components/Forum/Avatar";
import DropDown from "../../../components/Forum/DropDown";
import EditTextEditor from "../../../components/Forum/EditTextEditor/EditTextEditor";
import ImageOrVideo from "../../../components/Forum/ImageOrVideo";

import { useNavigate } from "react-router-dom";
import { AuthorizationContextProvider } from "../../../context/AuthorizationContext";
import { EditContextProvider } from "../../../context/EditContext";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Skeleton from "react-loading-skeleton";

dayjs.extend(relativeTime);

export default function PostContent({ postData }) {
  const [threadData, setTheadData] = useState({
    uploadFile: {
      src: null,
      type: "image",
    },
  });
  const navigate = useNavigate();

  const handleUserProfileRedirect = () => {
    navigate(`/user/${postData.createdBy.userId}`, { root: true });
  };
  const handleCommunityRedirect = () => {
    navigate(`/forum/communities/${postData.belongToThread}`, {
      root: true,
    });
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
                <Avatar src={threadData.uploadFile?.src} />
              </div>
            ) : (
              <Skeleton width="60px" height="60px" circle />
            )}
            <div style={{ maxWidth: "140px" }}>
              <p
                className="mb-0 p-0 text-general-emphasis fw-bold cursor-pointer position-relative"
                style={{ fontSize: "14px", wordBreak:"break-all" }}
                onClick={handleCommunityRedirect}
              >
                community/{threadData ? threadData.title : <Skeleton />}
              </p>
              <p
                style={{ fontSize: "14px" }}
                onClick={handleUserProfileRedirect}
                className="m-0 p-0 text-secondary cursor-pointer "
              >
                {postData.createdBy.username}
              </p>
            </div>
            <div
              style={{ height: "12px", marginTop: "5px" }}
              className="d-flex align-items-center gap-1"
            >
              <div
                className="rounded-circle bg-black"
                style={{ width: "3px", height: "3px" }}
              ></div>
              <p
                className="text-greeli-emphasis m-0 p-0"
                style={{ fontSize: "12px" }}
              >
                {postData.isApproved
                  ? dayjs().to(dayjs(postData.verifiedAt))
                  : dayjs().to(dayjs(postData.createdAt))}
              </p>
            </div>
          </div>
          <AuthorizationContextProvider
            componentType="post"
            objectId={postData._id}
          >
            <DropDown
              componentType="post"
              data={postData}
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
                alt={postData.title}
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
