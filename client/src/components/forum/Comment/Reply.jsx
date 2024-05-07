import { useContext, useRef, useState } from "react";

import Button from "react-bootstrap/esm/Button";
import { FaCommentAlt } from "react-icons/fa";
import AuthComponent from "../AuthComponent";
import TextEditor from "../TextEditor/TextEditor";

import ReplyContext from "../../../contexts/ReplyContext";

export default function Reply() {
  const replyContext = useContext(ReplyContext);
  function handleReply() {
    replyContext.setIsReply(isReply=>!isReply);
  }
  return (
    <>
      <Button
        className="ms-2 px-3 rounded-5 text-primary-green border-primary-green bg-transparent"
        onClick={handleReply}
      >
        <FaCommentAlt className="me-2" />
        Reply
      </Button>

      {replyContext.isReply? (
        <div className="mt-3">
        <AuthComponent componentType="replies" unAuthorizedProcess={true}>
          <TextEditor content="" resetClickDone={true} isExpand={true}/>
        </AuthComponent>
        </div>
      ) : null}
    </>
  );
}
