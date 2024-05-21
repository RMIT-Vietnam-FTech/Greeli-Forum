import axios from "axios";
import Post from "./PostPage/components/Post";
import { useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";
import { IoMdArrowDropdown } from "react-icons/io";
import { useUserContext } from "../../context/UserContext";

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

const getMetadata = async (url) => {
	return await axios.get(url).then((res) => res.data.metadata);
};

export default function DashBoardPage() {

  const { searchTerm } = useUserContext();
  const [searchResult, setSearchResult] = useState([]);
 
  const [metadata, setMetadata] = useState();
  const [sortOption, setSortOption] = useState("Hot");
  useEffect(() => {
    getMetadata(`/api/v1/posts`).then((res) => {
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
					: `/api/v1/posts?page=${
							index + 1
						}&sort=${sortOption}`,

      fetcher
    );
  const issues = data ? [].concat(...data) : [];
  useEffect(() => {
    console.log(searchTerm);
    setSearchResult(issues.filter(( issue ) => issue.title.toLowerCase().includes(searchTerm)));
  }, [searchTerm]);
  
  if (isLoading) {
    return 0;
  }


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
          <ul className="dropdown-menu bg-greeli-subtle ">
            <li>
              <a
                className={"dropdown-item "}
                onClick={() => {
                  setSortOption("Hot");
                }}
              >
                Hot
              </a>
            </li>
            <li>
              <a
                className={"dropdown-item "}
                onClick={() => {
                  setSortOption("New");
                }}
              >
                New
              </a>
            </li>
            <li>
              <a
                className={"dropdown-item "}
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
          {searchResult.map((postData) => {
            return (
              <Post
                key={postData._id}
                postData={postData}
                isThreadAdmin={false}
              />
            );
          })}
        </div>
        <div className="mt-2" ref={ref}></div>
      </div>
    </>
  );
}
