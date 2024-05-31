import axios from "axios";
import useSwr from "swr";
import Avatar from "../Avatar";
axios.defaults.withCredentials = true;

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function RightSideBarForum() {
  return (
    <div
      style={{ height: "95%" }}
      className="w-100 d-flex flex-column-reverse justify-content-end overflow-scroll-y"
    >
      <ForumLeaderBoard />
      <ForumStatistic />
    </div>
  );
}

function ForumStatistic() {
  const path = `http://localhost:3001/api/v1/forums/statistic`;
  const { data, error, isLoading } = useSwr(path, fetcher);
  if (error) {
    return <></>;
  }
  if (isLoading) {
    return <></>;
  }
  return (
    <div
      tabIndex="0"
      className="w-100  p-3 bg-forum-subtle d-flex flex-column align-items-start"
      style={{ borderRadius: "0.75rem" }}
    >
      <p className="text-primary-yellow  mb-3" style={{ fontSize: "18px" }}>
        Forum Statistic
      </p>
      <div className="w-100">
        <p className="text-white w-100 d-flex justify-content-between">
          <b className="w-50">Threads</b>{" "}
          <span className="ms-3 w-50">{data.thread}</span>
        </p>
        <p className="text-white w-100 d-flex justify-content-between">
          <b className="w-50">Posts</b>{" "}
          <span className="ms-3 w-50">{data.post}</span>
        </p>
        <p className="text-white w-100 d-flex justify-content-between">
          <b className="w-50">Members</b>{" "}
          <span className="ms-3 w-50">{data.user}</span>
        </p>
      </div>
    </div>
  );
}

function ForumLeaderBoard() {
  const path = `http://localhost:3001/api/v1/forums/leaderboard`;
  const { data, error, isLoading } = useSwr(path, fetcher);
  if (error) {
    return <></>;
  }
  if (isLoading) {
    return <></>;
  }
  return (
    <div
      tabIndex="0"
      className=" w-100 bg-forum-subtle d-flex flex-column gap-2 align-items-start overflow-scroll-y"
      style={{
        borderRadius: "0.75rem",
        height: "350px",
        marginTop: "23px",
        padding: "16px",
      }}
    >
      <p
        className="mt-3 m-0 p-0 text-primary-yellow"
        style={{ fontSize: "18px" }}
      >
        Most active users
      </p>
      {data.map((leadeboard, index) => {
        return (
          <a
            href={`http://localhost:3000/user/${leadeboard._id}`}
            key={leadeboard._id}
            className="w-100 d-flex px-2 align-items-center py-4 justify-content-start overflow-hidden text-white hover-style"
            style={{ borderRadius: "20px" }}
          >
            <div
              className=" d-flex gap-2 align-items-center justify-content-between"
              style={{ width: "60px", maxWidth: "100px" }}
            >
              <div>{index + 1}</div>
              <div
                className="rounded-circle bg-white overflow-hidden"
                style={{ width: "30px", height: "30px" }}
              >
                {leadeboard.profileImage && (
                  <img
                    alt={leadeboard.username}
                    src={leadeboard.profileImage}
                    className="w-100 h-100"
                  />
                )}
              </div>
            </div>
            <div className="ms-4" style={{ fontSize: "12px", width: "50%" }}>
              {leadeboard.username}
            </div>
          </a>
        );
      })}
    </div>
  );
}
