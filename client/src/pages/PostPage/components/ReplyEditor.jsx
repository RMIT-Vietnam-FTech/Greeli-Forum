import { useContext } from "react";

import AuthComponent from "../../../components/forum/AuthComponent";
import TextEditor from "../../../components/forum/TextEditor/TextEditor";

import ReplyContext from "../../../contexts/ReplyContext";
export default function ReplyEditor() {
  const replyContext = useContext(ReplyContext);
  return (
    <>
      {replyContext.isReply ? (
        <div className="mt-3">
          <AuthComponent componentType="replies" unAuthorizedProcess={true}>
            <TextEditor content="" resetClickDone={true} isExpand={true} />
          </AuthComponent>
        </div>
      ) : null}
    </>
  );
}
