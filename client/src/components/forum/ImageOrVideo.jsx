import axios from "axios";
import Skeleton from "react-loading-skeleton";
import ReactPlayer from "react-player";
import useSwr from "swr";

import "react-loading-skeleton/dist/skeleton.css";
const fetcher = (url) =>
  axios.get(url).then((res) => res.headers.get("Content-Type"));

export default function ImageOrVideo({ src,isPost, isThread, alt }) {
  //console.log("is post: " + isPost);
  const { data, error, isLoading } = useSwr(src, fetcher);
  if (error) {
    return 0;
  }
  if (isLoading) {
    return <Skeleton width="100vw" height="100vh" />;
  }
  if (data.startsWith("image")) {
    return (
      <img
        tabIndex="0"
        alt={"image: " + alt}
        src={src}
        className={"h-100 " + (isThread && "w-100")}
      />
    );
  }
  if (data.startsWith("video")) {
    return (
      <ReactPlayer
        controls={isPost ? false : true}
        url={src}
        className={"h-100" + (isThread && "w-100")}
      />
    );
  }
  return <></>;
}
