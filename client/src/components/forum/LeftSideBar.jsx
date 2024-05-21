import axios from "axios";
import useSwr from "swr";
import { useState, useContext } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { IoAdd } from "react-icons/io5";

import NewThreadPopUp from "../../pages/Forum/ThreadPage/components/NewThreadPopUp";

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
  return (
    <section className="w-100 d-flex flex-column px-2 pb-3 overflow-scroll-y">
      <PersonalThreadList>
        <CreatedThread />
        <FollowingThread />
      </PersonalThreadList>

      <TopicList>
        <ThreadList />
      </TopicList>
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
            className="w-100 d-flex justify-content-between align-items-center text-primary-yellow"
            data-bs-toggle="collapse"
            href="#collapse-tracking"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <a>Peronsonal Tracking</a>
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
  const [isOpen, setIsOpen] = useState(false);
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
      <a
        className="w-100 d-flex justify-content-between align-items-center text-white"
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
      </a>

      {/*collapse body*/}
      <div className="ms-3 collapse border-left-gray" id="collapse-created-thread">
        <div
          onClick={() => {
            setIsOpen(true);
          }}
          className="w-100 d-flex flex-column justify-content-between text-white cursor-pointer"
        >
          <p className="m-0 p-0 mb-4">
            Create Thread <IoAdd />
          </p>
          {data.map((thread) => {
            return (
              <a
                key={thread._id}
                href={`http://localhost:3000/forum/threads/${thread._id}`}
                className="d-block text-white mb-4"
              >
                {thread.title}
              </a>
            );
          })}
        </div>
      </div>

      <NewThreadPopUp isOpen={isOpen} setIsOpen={setIsOpen} />
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
      <a
        className="w-100 d-flex justify-content-between align-items-center text-white "
        data-bs-toggle="collapse"
        href="#collapse-following-thread"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        <a>Following Thread</a>
        <p className="m-0 p-0">
          <IoIosArrowDown />
        </p>
      </a>

      {/*collapse body*/}
      <div className="ms-3 collapse  border-left-gray" id="collapse-following-thread">
        <div>
          {data.map((thread) => {
            return (
              <a
                key={thread._id}
                href={`http://localhost:3000/forum/threads/${thread._id}`}
                className="d-block text-white mb-4"
              >
                {thread.title}
              </a>
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
      <a
        className="w-100 d-flex justify-content-between align-items-center  text-primary-yellow"
        data-bs-toggle="collapse"
        href="#collapse3"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        <a>Topics</a>
        <p className="m-0 p-0">
          <IoIosArrowDown />
        </p>
      </a>
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
            <a
              className="w-100 d-flex justify-content-between align-items-center text-white"
              data-bs-toggle="collapse"
              href={`#${topic._id}`}
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <a>{topic.title}</a>
              <p className="p-0 m-0">
                <IoIosArrowDown />
              </p>
            </a>

						{/*collapse body*/}
						<div
							className="collapse border-left-gray ms-3"
							id={topic._id}
						>
							{topic.threads.map((thread) => {
								return (
									<a
										key={thread._id}
										href={`/forum/threads/${thread._id}`}
										className="d-block text-white mb-4"
									>
										{thread.title}
									</a>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}
