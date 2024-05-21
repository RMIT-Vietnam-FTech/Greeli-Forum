import axios from "axios";
import Post from "../PostPage/components/Post";
import { useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";
import { IoMdArrowDropdown } from "react-icons/io";
import { useUserContext } from "../../../context/UserContext";

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

const verifyAdminFetcher = async (url) => {
  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
    .then((res) => res.data.data);
};
const getMetadata = async (isThreadAdmin, threadData) => {
  const path = isThreadAdmin
    ? `http://localhost:3001/api/v1/admin/posts?page=1&belongToThread=${threadData._id}`
    : `http://localhost:3001/api/v1/posts?page=1&belongToThread=${threadData._id}`;
  return await axios
    .get(
      path,
      isThreadAdmin
        ? {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
          }
        : null
    )
    .then((res) => res.data.metadata);
};

export default function ThreadBody({ threadData }) {
  const { searchTerm } = useUserContext();
  const [searchResult, setSearchResult] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const isThreadAdmin = user && threadData.createdBy.userId == user.id;
  const [metadata, setMetadata] = useState();
  const [sortOption, setSortOption] = useState("Hot");
  //Search data
  useEffect(() => {
    getMetadata(isThreadAdmin, threadData).then((res) => {
      setMetadata(res);
    });
  }, []);
  // console.log(`check metadata: ${JSON.stringify(metadata)}`);
  const { ref, inView, entry } = useInView({
    threshold: 0,
    onChange: (inView, entry) => {
      let limit;
      let total;
      if (metadata) {
        limit = metadata.limit;
        total = metadata.total;
      } else {
        limit = 10;
        total = 21;
      }
      // console.log(`check size: ${size}\n check limit: ${limit}\n check total: ${total}`)
      if (inView && size * limit <= total) {
        setSize(size + 1);
      }
    },
  });

  const { data, mutate, size, setSize, isValidating, isLoading } =
    useSWRInfinite(
      (index, prevData) =>
        prevData && !prevData.length
          ? null
          : isThreadAdmin
          ? `http://localhost:3001/api/v1/admin/posts?page=${
              index + 1
            }&belongToThread=${threadData._id}&sort=${sortOption}`
          : `http://localhost:3001/api/v1/posts?page=${
              index + 1
            }&belongToThread=${threadData._id}&sort=${sortOption}`,

      isThreadAdmin ? verifyAdminFetcher : fetcher
    );

//   setSearchResult(issues);
  const issues = data ? [].concat(...data) : [];
  useEffect(() => {
    console.log(searchTerm);
    setSearchResult(
      issues.filter((issue) => issue.title.toLowerCase().includes(searchTerm))
    );
  }, [searchTerm]);

  if (isLoading) {
    return 0;
  }

  // const issues = data ? [].concat(...data) : [];
  // setSearchResult(issues.filter(( issue ) => issue.title.toLowerCase().includes(searchTerm)));

  return (
    <>
      {/*sorting*/}
      <div className="position-relative">
        <div className="dropdown ms-3">
          <button
            className={
              "btn  d-flex gap-1 bg-forum-subtle text-white d-flex rounded-5 px-4 "
            }
            data-bs-toggle="dropdown"
          >
            <p className="m-0 p-0">{sortOption}</p>
            <div>
              <IoMdArrowDropdown />
            </div>
          </button>
          <ul className="dropdown-menu bg-forum-subtle">
            <li>
              <a
                tabIndex="0"
                className={"dropdown-item"}
                onClick={() => {
                  setSortOption("Hot");
                }}
              >
                Hot
              </a>
            </li>
            <li>
              <a
                tabIndex="0"
                className={"dropdown-item"}
                onClick={() => {
                  setSortOption("New");
                }}
              >
                New
              </a>
            </li>
            <li>
              <a
                tabIndex="0"
                className={"dropdown-item"}
                onClick={() => {
                  setSortOption("Top");
                }}
              >
                Top
              </a>
            </li>
          </ul>
        </div>

        {/*Post items*/}
        <div>
          {searchResult.length > 0
            ? searchResult.map((postData) => {
                return (
                  <Post
                    key={postData._id}
                    postData={postData}
                    threadId={threadData._id}
                    isThreadAdmin={isThreadAdmin}
                  />
                );
              })
            : issues.map((postData) => {
                return (
                  <Post
                    key={postData._id}
                    postData={postData}
                    threadId={threadData._id}
                    isThreadAdmin={isThreadAdmin}
                  />
                );
              })}
        </div>
        <div className="mt-2" ref={ref}></div>
      </div>
    </>
  );
}
