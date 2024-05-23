import Avatar from "../../../components/Forum/Avatar";
import DropDown from "../../../components/Forum/DropDown";
import EditTextEditor from "../../../components/Forum/EditTextEditor/EditTextEditor";
import ImageOrVideo from "../../../components/Forum/ImageOrVideo";

import { AuthorizationContextProvider } from "../../../context/AuthorizationContext";
import { EditContextProvider } from "../../../context/EditContext";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function PostContent({ postData }) {
  const navigate = useNavigate();

  const handleUserProfileRedirect = () => {
    navigate(`/user/${postData.createdBy.userId}`, { root: true });
  };

  return (
    <section className="w-100 position-relative">
      <EditContextProvider>
        <div className="w-100 d-flex">
          {/*post header*/}
          <div className="d-flex gap-2" onClick={handleUserProfileRedirect}>
            <Avatar src={postData.createdBy.profileImage} />
              <p className="mb-0 text-general-emphasis">
                {postData.createdBy.username}
              </p>
              <li className="text-greeli-emphasis">
                {postData.isApproved
                  ? dayjs().to(dayjs(postData.verifiedAt))
                  : dayjs().to(dayjs(postData.createdAt))}
              </li>
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
              <ImageOrVideo alt={postData.createdBy.username} src={postData.uploadFile} isPost={false} />
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
