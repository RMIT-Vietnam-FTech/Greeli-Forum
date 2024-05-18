import axios from "axios";
import useSwr from "swr";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import NewThreadPopUp from "../../pages/Forum/ThreadPage/components/NewThreadPopUp";
import { Link } from "react-router-dom";
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
export default function AuthLeftSideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/*collapse section*/}
      <section className="d-flex px-4 flex-column w-100">
        {/*collapse header*/}
        <a
          className="w-100 d-flex justify-content-between align-items-center  text-primary-yellow"
          data-bs-toggle="collapse"
          href="#collapse1"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <a>Custom Threads</a>
          <p>
            <IoIosArrowUp />
          </p>
        </a>

        {/*collapse body*/}
        <div className="collapse" id="collapse1">
          <div
            onClick={() => {
              setIsOpen(true);
            }}
            className="w-100 d-flex justify-content-between text-white cursor-pointer"
          >
            <p>Create Threads </p>
            <p>
              <IoAdd />
            </p>
          </div>
          <CreatedThread />
        </div>

        {/*collapse header*/}
        <a
          className="w-100 d-flex justify-content-between align-items-center  text-primary-yellow"
          data-bs-toggle="collapse"
          href="#collapse2"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <a>Following Threads</a>
          <p>
            <IoIosArrowUp />
          </p>
        </a>

        {/*collapse body*/}
        <div className="collapse" id="collapse2">
          <FollowingThread/>
        </div>
      </section>
      <NewThreadPopUp isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
  );
}

function CreatedThread() {
  function showLimitedLetter(word, limitNumber) {
    const result = word.substring(0, limitNumber + 1) + "...";
    return result;
  }
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
    <div>
      {data.map((thread) => {
        return (
          <Link
            key={thread._id}
            to={`/forum/threads/${thread._id}`}
            className="d-block text-white mb-4"
          >
            {showLimitedLetter(thread.title, 15)}
          </Link>
        );
      })}
    </div>
  );
}
function FollowingThread() {
  function showLimitedLetter(word, limitNumber) {
    const result = word.substring(0, limitNumber + 1) + "...";
    return result;
  }
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
    <div>
      {data.map((thread) => {
        return (
          <Link
            key={thread._id}
            to={`/forum/threads/${thread._id}`}
            className="d-block text-white mb-4"
          >
            {showLimitedLetter(thread.title, 15)}
          </Link>
        );
      })}
    </div>
  );
}