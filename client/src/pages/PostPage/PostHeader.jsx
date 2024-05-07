import Avatar from "../../components/forum/Avatar";
import DropDown from "../../components/forum/DropDown";
import ImageOrVideo from "../../components/forum/ImageOrVideo";
import ButtonUpvote from "../../components/ButtonUpvote";
import TextEditor from "../../components/forum/TextEditor/TextEditor";
import AuthComponent from "../../components/forum/AuthComponent";
import { useParams } from "react-router-dom";
export default function PostHeader({ ...prop }) {
  const {
    profileImage,
    threadName,
    username,
    title,
    uploadFile,
    upvote,
    content,
    objectId
  } = prop;
  return (
    <AuthComponent componentType="posts" unAuthorizedProcess={false} objectId={objectId}>
      <section className="w-100 position-relative">
        <div className="w-100 d-flex">
          <div className="d-flex gap-2">
            <Avatar src={profileImage} />
            <div className="h-auto">
              <p className="mb-0 text-primary-green-900 fw-bold">
                thread/{threadName}
              </p>
              <p className="mb-0">{username}</p>
            </div>
          </div>
          <DropDown />
        </div>

        <div className=" my-3 w-100">
          <h3>{title}</h3>
          <div
            className="w-100 my-4 bg-primary-green-600 rounded-3 d-flex justify-content-center overflow-hidden"
            style={{ height: "400px" }}
          >
            <ImageOrVideo src={uploadFile} isPost={false} />
          </div>
          <TextEditor
            content={content}
          />
        </div>
        <div className="d-flex gap-3">
          <ButtonUpvote upvote={upvote} />
        </div>
      </section>
    </AuthComponent>
  );
}
