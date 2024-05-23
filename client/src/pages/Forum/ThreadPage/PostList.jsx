import axios from "axios";
import Post from "../../../components/Forum/Post";
import { useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";
import { IoMdArrowDropdown } from "react-icons/io";
import { useUserContext } from "../../../context/UserContext";

const fetcher = async (url, isThreadAdmin, isMetaData) => {
  const header = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
    },
  };
  if (isMetaData) {
    if (isThreadAdmin) {
      return await axios.get(url, header).then((res) => res.data.metadata);
    }
    return await axios.get(url).then((res) => res.data.metadata);
  } else if (isThreadAdmin) {
    return await axios.get(url, header).then((res) => res.data.data);
  }
  return await axios.get(url).then((res) => res.data.data);
};

export default function PostList({ threadData }) {
  const { searchTerm } = useUserContext();
  const [searchResult, setSearchResult] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const isThreadAdmin =
    user && threadData && threadData.createdBy.userId == user.id;
  const [sortOption, setSortOption] = useState("Hot");

  const validatedPath = (isThreadAdmin, threadData, sort, page) => {
    if (isThreadAdmin) {
      return `http://localhost:3001/api/v1/admin/posts?page=${page}&belongToThread=${threadData._id}&sort=${sort}`;
    } else if (threadData) {
      return `http://localhost:3001/api/v1/posts?page=${page}&belongToThread=${threadData._id}&sort=${sort}`;
    }
    return `http://localhost:3001/api/v1/posts?page=${page}&sort=${sort}`;
  };

  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index, prevData) =>
      prevData && !prevData.length
        ? null
        : [
            validatedPath(isThreadAdmin, threadData, sortOption, index + 1),
            isThreadAdmin,
            false,
          ],
    fetcher
  );

  const issues = data ? [].concat(...data) : [];

  {
    /*------define component to get metdata and use intersection observer to achieve lazyload-------------*/
  }
  const path = validatedPath(isThreadAdmin, threadData, sortOption, 1);

  const [metaData, setMetaData] = useState();
  useEffect(() => {
    fetcher(path, isThreadAdmin, true).then((res) => {
      setMetaData(res);
    });
  }, []);
  let limit, total;

  const { ref, inView, entry } = useInView({
    threshold: 0,
    onChange: (inView, entry) => {
      if (metaData) {
        limit = metaData.limit;
        total = metaData.total;
      } else {
        limit = 10;
        total = 10;
      }
      if (inView && size * limit <= total) {
        setSize(size + 1);
      }
    },
  });
  {
    /*------------------------------------------------------------------------------------------------------*/
  }
  useEffect(() => {
    setSearchResult(
      issues.filter((issue) => issue.title.toLowerCase().includes(searchTerm))
    );
  }, [searchTerm]);

  if (isLoading) {
    return 0;
  }

  return (
    <>
      <div className="position-relative">
        <Sorting sortOption={sortOption} setSortOption={setSortOption} />
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

const Sorting = ({ sortOption, setSortOption }) => {
  return (
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
  );
};
