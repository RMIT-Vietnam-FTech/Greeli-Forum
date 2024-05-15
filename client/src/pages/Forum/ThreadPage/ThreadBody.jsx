import axios from "axios";
import Post from "../PostPage/components/Post";
import { useState } from "react";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function ThreadBody({belongToThread}) {
  const [page, setPage] = useState(1);
  const path = `http://localhost:3001/api/v1/posts?page=${page}&belongToThread=${belongToThread}`;
  console.log("check path: "+ path);
  const {data, error, isLoading} = useSWR(path, fetcher);
  if (error) {
    return 0;
  }
  if (isLoading) {
    return 0;
  }
  // console.log("data page: "+ JSON.stringify(data[0].data));
  return data[0].data.map((postData) => {
  	return( <Post key={postData._id} postData={postData} />);
  });
  return <></>;
}
