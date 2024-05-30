import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useInView } from "react-intersection-observer";
import useSwrInfinite from "swr/infinite";
import Post from "../../../components/Forum/Post";
import { useUserContext } from "../../../context/UserContext";
import PostSkeleton from "../../../components/Forum/Skeleton/PostSkeleton";

axios.defaults.withCredentials = true;

const fetcher = async (prop) => {
	const [url, isThreadAdmin, isMetaData] = prop;
	console.log(
		`check thread admin: ${isThreadAdmin} \n url: ${url}, \n isMetadata: ${isMetaData}`,
	);

	if (isMetaData) {
		if (isThreadAdmin) {
			console.log("in this play");
			return await axios
				.get(url, {
					headers: {
						// Authorization: `Bearer ${
						// 	JSON.parse(localStorage.getItem("user")).token
						// }`,
					},
				})
				.then((res) => res.data.metadata);
		}
		return await axios.get(url).then((res) => res.data.metadata);
	} else if (isThreadAdmin) {
		return await axios
			.get(url, {
				headers: {
					// Authorization: `Bearer ${
					// 	JSON.parse(localStorage.getItem("user")).token
					// }`,
				},
			})
			.then((res) => res.data.data);
	}
	return await axios.get(url).then((res) => res.data.data);
};

export default function PostList({ threadData, topicData }) {
	const [sortOption, setSortOption] = useState("Hot");

	const user = JSON.parse(localStorage.getItem("user"));
	const isThreadAdmin =
		user && threadData && threadData.createdBy.userId == user.id;

	const validatedPath = (isThreadAdmin, threadData, sort, page) => {
		if (isThreadAdmin) {
			return `http://localhost:3001/api/v1/admin/posts?page=${page}&belongToThread=${threadData._id}&sort=${sort}`;
		} else if (threadData) {
			return `http://localhost:3001/api/v1/posts?page=${page}&belongToThread=${threadData._id}&sort=${sort}`;
		} else if (topicData) {
			return `http://localhost:3001/api/v1/posts?page=${page}&belongToTopic=${topicData._id}&sort=${sort}`;
		}
		return `http://localhost:3001/api/v1/posts?page=${page}&sort=${sort}`;
	};

	const { data, size, setSize, isLoading } = useSwrInfinite(
		(index, prevData) => {
			if (prevData && !prevData.length) return null;
			return [
				validatedPath(isThreadAdmin, threadData, sortOption, index + 1),
				isThreadAdmin,
				false,
			];
		},
		fetcher,
	);

	const issues = data ? [].concat(...data) : [];
	{
		/*------define component to get metdata and use intersection observer to achieve lazyload-------------*/
	}
	const path = validatedPath(isThreadAdmin, threadData, sortOption, 1);

	const [metaData, setMetaData] = useState();
	useEffect(() => {
		fetcher([path, isThreadAdmin, true]).then((res) => {
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

	if (isLoading) {
		return <PostSkeleton nOfCard={5} />;
	}

  return (
    <>
      <div className="position-relative">
        <Sorting sortOption={sortOption} setSortOption={setSortOption} />
        {/*Post items*/}
        <div className="pt-4">
          {issues.map(
            (postData) =>
              postData &&
              !postData.archived.isArchived 
              && !postData.isDeleted
               && (
                <div className="post-list-item">
                  <Post
                    key={postData._id}
                    postData={postData}
                    isThreadAdmin={isThreadAdmin}
                  />
                </div>
              )
          )}
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
					"btn  d-flex gap-1 bg-login-subtle text-greeli-reverse-emphasis d-flex rounded-5 px-4 "
				}
				data-bs-toggle="dropdown"
			>
				<p className="m-0 p-0">{sortOption}</p>
				<div>
					<IoMdArrowDropdown />
				</div>
			</button>

      <ul className="dropdown-menu bg-forum-subtle ">
        <li>
          <a
            tabIndex="0"
            className="dropdown-item text-white"
            onClick={() => {
              setSortOption("Newest");
            }}
          >
            Newest
          </a>
        </li>

        <li>
          <a
            tabIndex="0"
            className="dropdown-item text-white"
            onClick={() => {
              setSortOption("Oldest");
            }}
          >
            Oldest
          </a>
        </li>

        <li>
          <a
            tabIndex="0"
            className="dropdown-item text-white"
            onClick={() => {
              setSortOption("Hottest");
            }}
          >
            Hottest
          </a>
        </li>
      </ul>
    </div>
  );
};
