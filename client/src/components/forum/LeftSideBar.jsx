import axios from "axios";
import useSwr from "swr";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function LeftSideBar() {
  return (
    <>
      {/*collapse section*/}
      <section
        className="d-flex px-4 flex-column gap-3 w-100 overflow-scroll-y"
        style={{ height: "90%" }}
      >
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
        <div className="collapse show " id="collapse3">
          <Topic />
        </div>
      </section>
    </>
  );
}

function Topic() {
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
            <div className="collapse ms-3 border-left-gray" id={topic._id}>
              {topic.threads.map((thread) => {
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
        );
      })}
    </div>
  );
}
