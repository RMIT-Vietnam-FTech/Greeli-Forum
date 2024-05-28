import axios from "axios";
import ReactPlayer from "react-player";
import useSwr from "swr";

// const fetcher = (url) =>
// 	axios.get(url).then((res) => res.headers.get("Content-Type"));

export default function ImageOrVideo({ src, isPost, alt }) {
	//console.log("is post: " + isPost);
	// const { data, error, isLoading } = useSwr(src, fetcher);
	// if (error) {
	// 	return 0;
	// }
	// if (isLoading) {
	// 	return 0;
	// }
	// if (data.startsWith("image")) {
	return (
		<img tabIndex="0" alt={"image: " + alt} src={src} className="h-100" />
	);
	// }
	// if (data.startsWith("video")) {
	// 	return (
	// 		<ReactPlayer
	// 			controls={isPost ? false : true}
	// 			url={src}
	// 			className="h-100"
	// 		/>
	// 	);
	// }
	// return <></>;
}
