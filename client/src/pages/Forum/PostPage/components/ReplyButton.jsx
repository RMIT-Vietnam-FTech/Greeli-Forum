import { useContext, useRef, useState } from "react";

import Button from "react-bootstrap/esm/Button";
import { FaCommentAlt } from "react-icons/fa";
import { ReplyContext } from "../../../../context/ReplyContext";

export default function ReplyButton({ nOfReply }) {
  const replyContext = useContext(ReplyContext);
  function handleReply() {
    replyContext.setIsReply((isReply) => !isReply);
  }
  return (
    <button
      className="ms-2 px-2 rounded-5 text-error-emphasis  border border-primary-green bg-transparent"

      onClick={handleReply}
    >
      <FaCommentAlt className="me-2" />
      Reply
    </button>
  );
}
