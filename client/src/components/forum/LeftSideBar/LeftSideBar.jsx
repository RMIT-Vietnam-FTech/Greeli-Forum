import axios from "axios";
import useSwr from "swr";
import { useState, useContext } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { IoAdd } from "react-icons/io5";

import NewThreadPopUp from "../../../pages/Forum/ThreadPage/components/NewThreadPopUp";
import { NavLink } from "react-router-dom";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const validatedFetcher = (url) => {
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
    .then((res) => res.data);
};
export default function LeftSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="w-100 d-flex flex-column px-2 pb-3 overflow-scroll-y">
      <PersonalThreadList>
        <button
          className="w-100 bg-primary-yellow text-dark rounded-2 border-0"
          style={{ borderWidth: "0.5px" }}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Create Thread <IoAdd />
        </button>
        <CreatedThread />
        <FollowingThread />
      </PersonalThreadList>

      <TopicList>
        <ThreadList />
      </TopicList>
      <NewThreadPopUp isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
}
function PersonalThreadList({ children }) {
  return (
    JSON.parse(localStorage.getItem("user")) && (
      <>
        <section className=" w-100 pb-4 border-bottom  border-secondary">
          {/*collapse header*/}
          <a
            className="w-100 d-flex justify-content-between text-primary-yellow"
            data-bs-toggle="collapse"
            href="#collapse-tracking"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <a style={{ fontSize: "18px" }}>Tracking</a>
            <p className="m-0 p-0">
              <IoIosArrowDown />
            </p>
          </a>

          {/*collapse body*/}
          <div className="collapse show" id="collapse-tracking">
            {children}
          </div>
        </section>
      </>
    )
  );
}

function CreatedThread() {
  const path = `http://localhost:3001/api/user/${
    JSON.parse(localStorage.getItem("user")).id
  }/created_threads`;

  const { data, error, isLoading } = useSwr(path, validatedFetcher);
  if (error) {
    return <div>is error</div>;
  }
  if (isLoading) {
    return <div>is loading</div>;
  }
  return (
    <>
      {/*collapse header*/}
      <button
        className="w-100 d-flex justify-content-between bg-transparent border-0 align-items-center text-white"
        data-bs-toggle="collapse"
        href="#collapse-created-thread"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        <a>Custom Thread</a>

        <p className="m-0 p-0">
          <IoIosArrowDown />
        </p>
      </button>

      {/*collapse body*/}
      <div
        className="ms-3 collapse border-left-gray"
        id="collapse-created-thread"
      >
        <div
          className="w-100 d-flex flex-column justify-content-between text-white cursor-pointer"
          style={{ gap: "20px", marginBottom: "20px" }}
        >
          {data.map((thread) => {
            return (
              <NavLink
                key={thread._id}
                to={`/forum/threads/${thread._id}`}
                className="d-block text-white"
              >
                {thread.title}
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}
function FollowingThread() {
  const path = `http://localhost:3001/api/user/${
    JSON.parse(localStorage.getItem("user")).id
  }/follow_threads`;

  const { data, error, isLoading } = useSwr(path, validatedFetcher);
  if (error) {
    return <div>is error</div>;
  }
  if (isLoading) {
    return <div>is loading</div>;
  }

  return (
    <>
      {/*collapse header*/}
      <button
        className="w-100 d-flex justify-content-between bg-transparent border-0 align-items-center text-white "
        data-bs-toggle="collapse"
        href="#collapse-following-thread"
        role="button"
        aria-expanded="true"
        aria-controls="collapseExample"
      >
        <a>Following Thread</a>
        <p className="m-0 p-0">
          <IoIosArrowDown />
        </p>
      </button>

      {/*collapse body*/}
      <div
        className="ms-3 collapse  border-left-gray"
        id="collapse-following-thread"
      >
        <div
          className="w-100 d-flex flex-column justify-content-between "
          style={{ gap: "20px"}}
        >
          {data.map((thread) => {
            return (
              <NavLink
                key={thread._id}
                to={`http://localhost:3000/forum/threads/${thread._id}`}
                className="d-block text-white"
              >
                {thread.title}
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}

function TopicList({ children }) {
  return (
    <>
      {/*collapse header*/}
      <button
        className="w-100 d-flex justify-content-between align-items-center bg-transparent border-0 text-primary-yellow"
        data-bs-toggle="collapse"
        href="#collapse3"
        role="button"
        aria-expanded="true"
        aria-controls="collapseExample"
      >
        <a style={{ fontSize: "18px" }}>Topic</a>
        <p className="m-0 p-0">
          <IoIosArrowDown />
        </p>
      </button>
      {/*collapse body*/}
      <div className="collapse show" id="collapse3">
        {children}
      </div>
    </>
  );
}

function ThreadList() {
  const path = "http://localhost:3001/api/v1/topics";
  const { data, error, isLoading } = useSwr(path, fetcher);
  if (isLoading) {
    return 0;
  }
  return (
    <div>
      {data.map((topic) => {
        return (
          <div key={topic._id}>
            {/*collapse header*/}
            <button
              className="w-100 d-flex justify-content-between align-items-center bg-transparent border-0 text-white"
              data-bs-toggle="collapse"
              href={`#${topic._id}`}
              role="button"
              aria-expanded="true"
            >
              <a>{topic.title}</a>
              <p className="p-0 m-0">
                <IoIosArrowDown />
              </p>
            </button>

            {/*collapse body*/}
            <div className="collapse border-left-gray ms-3" id={topic._id}>
              {topic.threads.map((thread) => {
                return (
                  <NavLink
                    key={thread._id}
                    to={`/forum/threads/${thread._id}`}
                    className="d-block text-white mb-4"
                  >
                    {thread.title}
                  </NavLink>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
