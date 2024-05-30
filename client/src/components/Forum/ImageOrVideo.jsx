import axios from "axios";
import Skeleton from "react-loading-skeleton";
import ReactPlayer from "react-player";
import useSwr from "swr";

import "react-loading-skeleton/dist/skeleton.css";

export default function ImageOrVideo({ uploadFile, h100, w100, alt, isPost }) {
	if (uploadFile) {
		if (uploadFile.type === "image") {
			return (
				<img
					tabIndex="0"
					alt={"image: " + alt}
					src={uploadFile.src}
					className={(h100 && "h-100 ") + (w100 && "w-100")}
				/>
			);
		}
		if (uploadFile.type === "video") {
			return (
				<ReactPlayer
					controls={isPost ? false : true}
					url={uploadFile.src}
					className={(h100 && "h-100 ") + (w100 && "w-100")}
				/>
			);
		}
	}
	return <></>;
}
