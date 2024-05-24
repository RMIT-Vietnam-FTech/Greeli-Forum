
import axios from "axios";
import useSwr from "swr";
import { useState, useContext } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { IoAdd } from "react-icons/io5";

import NewThreadPopUp from "../../../pages/Forum/ThreadPage/components/NewThreadPopUp";
import { NavLink } from "react-router-dom";

axios.defaults.withCredentials = true;

{/*---------------------fetching function ----------------------*/}
const fetcher = (url) => axios.get(url).then((res) => res.data);
const validatedFetcher = (url) => {
  return axios
    .get(url, {
      headers: {
        // Authorization: `Bearer ${
        //   JSON.parse(localStorage.getItem("user")).token
        // }`,
      },
    })
    .then((res) => res.data);
};
{/*--------------------default style  -------------------------*/}

const listHeadingStyle = "w-100 d-flex justify-content-between   text-primary-yellow border-0 py-2 px-1 left-sidebar-item"
const listItemStyle = "w-100 d-flex justify-content-between align-items-center  text-greeli-emphasis border-0 py-2 px-1 left-sidebar-item"
const nestedListItemStyle = "d-block py-2 px-1 text-greeli-emphasis left-sidebar-item"

export default function LeftSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="w-100 d-flex flex-column px-2 pb-3 overflow-scroll-y"
    style={{height:"88%"}}
    >
      <PersonalThreadList>
        <button
          className="w-100 my-2 bg-primary-yellow text-dark rounded-2 border-0"
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
        <section
          className=" w-100 py-2 border-bottom-gray"
        >
          {/*collapse header*/}
          <button
            className={listHeadingStyle}
            data-bs-toggle="collapse"
            href="#collapse-tracking"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <a >Tracking</a>
            <p className="m-0 p-0">
              <IoIosArrowDown />
            </p>
          </button>

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
  const path = `/api/user/${
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
        className={listItemStyle}
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
        className="ms-3  collapse border-left-gray"
        id="collapse-created-thread"
      >
        <div
          className="w-100 d-flex flex-column justify-content-between "
        >
          {data.map((thread) => {
            return (
              <NavLink
                key={thread._id}
                to={`/forum/threads/${thread._id}`}
                className={nestedListItemStyle}
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
  const path = `/api/user/${
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
        className={listItemStyle}
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
        className="ms-3  collapse  border-left-gray"
        id="collapse-following-thread"
      >
        <div
          className="w-100 d-flex flex-column justify-content-between "
        >
          {data.map((thread) => {
            return (
              <NavLink
                key={thread._id}
                to={`/forum/threads/${thread._id}`}
                className={nestedListItemStyle}
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
    <section className="py-2">

      {/*collapse header*/}
      <button
        className={listHeadingStyle}
        data-bs-toggle="collapse"
        href="#collapse3"
        aria-expanded="true"
        aria-controls="collapseExample"
      >
        <a>Topic</a>
        <p className="m-0 p-0">
          <IoIosArrowDown />
        </p>
      </button>
      {/*collapse body*/}
      <div className="collapse show" id="collapse3">
        {children}
      </div>
    </section>
  );
}

function ThreadList() {
  const path = "/api/v1/topics";
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
              className={listItemStyle}
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
                    className={nestedListItemStyle}
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
