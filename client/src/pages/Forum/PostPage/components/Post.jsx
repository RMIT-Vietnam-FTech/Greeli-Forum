import { Link } from "react-router-dom";
import Avatar from "../../../../components/forum/Avatar";
import ImageOrVideo from "../../../../components/forum/ImageOrVideo";
import { IoIosPaper } from "react-icons/io";
export default function Post({ postData }) {
  return (
    <div className="w-100 position-relative d-flex justify-content-center bg-primary-green-600 my-4 px-5 py-3 rounded-3">
      <Link
        to={`../posts/${postData._id}`}
        className="w-100 d-flex gap-2 justify-content-between align-items-center bg-primary-900 text-white text-decoration-none  "
      >
        <div className="w-75 d-flex flex-column justify-content-between">
          <div className="d-flex gap-2">
            <Avatar src={postData.createdBy.profileImage} />
            <div className="h-auto">
              <p className="mb-0 text-primary-yellow-400 fw-bold">
                thread/{postData.threadName}
              </p>
              <p className="mb-0">{postData.createdBy.username}</p>
            </div>
          </div>
          <p className="fw-bold">{postData.title}</p>
        </div>
        {postData.uploadFile ? (
          <div
            className=" w-25 d-flex justify-content-center bg-primary-green-900 rounded-3 overflow-hidden "
            style={{ height: "100px" }}
          >
            <ImageOrVideo src={postData.uploadFile} isPost={true} />
          </div>
        ) : (
          <div
            className=" w-25 d-flex justify-content-center align-items-center bg-primary-green-900 rounded-3 overflow-hidden "
            style={{ height: "100px" }}
          >
            <IoIosPaper className="w-75 h-75 text-primary-green-400" />
          </div>
        )}
      </Link>
    </div>
  );
}
