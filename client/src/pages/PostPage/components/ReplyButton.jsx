import { useContext, useRef, useState } from "react";

import Button from "react-bootstrap/esm/Button";
import { FaCommentAlt } from "react-icons/fa";
import AuthComponent from "../../../components/forum/AuthComponent";
import TextEditor from "../../../components/forum/TextEditor/TextEditor";
import ReplyContext from "../../../contexts/ReplyContext";

export default function ReplyButton() {
  const replyContext = useContext(ReplyContext);
  function handleReply() {
    replyContext.setIsReply((isReply) => !isReply);
  }
  return (
    <Button
      className="ms-2 px-3 rounded-5 text-primary-green border-primary-green bg-transparent"
      onClick={handleReply}
    >
      <FaCommentAlt className="me-2" />
      Reply
    </Button>
  );
}
