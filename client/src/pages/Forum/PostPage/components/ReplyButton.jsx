import { useContext, useRef, useState } from "react";

import Button from "react-bootstrap/esm/Button";
import { FaCommentAlt } from "react-icons/fa";

import { ReplyContext } from "../../../../context/ReplyContext";
import { PopupContext } from "../../../../context/PopupContext";
import { useLogin } from "../../../../components/Popup/LoginPopup";

export default function ReplyButton({ nOfReply }) {
	const replyContext = useContext(ReplyContext);
	const popupContext = useContext(PopupContext);
	const isLogin = useLogin();
	function handleReply() {
		if (isLogin) {
			replyContext.setIsReply((isReply) => !isReply);
		} else {
			popupContext.setIsPopup(true);
		}
	}
	return (
		<button
			className="ms-2 px-2 rounded-5 text-forum-emphasis  border border-primary-green bg-transparent"
			onClick={handleReply}
		>
			<FaCommentAlt className="me-2" />
			Reply
		</button>
	);
}
