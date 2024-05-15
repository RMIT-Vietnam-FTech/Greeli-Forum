import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { BsArrowUpSquareFill } from "react-icons/bs";
export default function ButtonUpvote({ upvote }) {
	function handleUpvote() {
		const isVoted = upvote.includes("");
		if (isVoted) {
			const index = upvote.indexOf();
			console.log("check index: " + index);
			if (index > -1) {
				upvote.splice(index, 1);
				setNofUpvote((data) => data - 1);
			}
		} else {
			upvote.push(); //push objectID of user -> update backend
			setNofUpvote((data) => data + 1);
		}
	}
	const [nOfUpvote, setNofUpvote] = useState(upvote.length);
	return (
		<Button
			onClick={() => {
				handleUpvote();
			}}
			className=" px-3 rounded-5 text-primary-green border-primary-green bg-transparent"
		>
			<BsArrowUpSquareFill className="me-2" />
			{nOfUpvote}
		</Button>
	);
}

