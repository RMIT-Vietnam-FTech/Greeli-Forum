import { useContext, useId, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCurrentEditor } from "@tiptap/react";
import { EditContext } from "../../../../../context/EditContext";
import { ReplyContext } from "../../../../../context/ReplyContext";
import Comment from "../Comment";
export default function ReplyBottomBar({ parentId }) {
  const editContext = useContext(EditContext);
  const replyContext = useContext(ReplyContext);
  const { postId } = useParams();
  const replyId = useId();
  const { editor } = useCurrentEditor();

  if (!editor.isEditable) {
    editor.setEditable(true);
  }
  function handleOnCancel() {
    editor.setEditable(false);
    editContext.setIsEdit(false);
    editor.commands.setContent("");
    replyContext.setIsReply(false);
  }

  async function handleOnDone(parentId) {
    console.log("check parentId: " + parentId);
    if (editor.getText()) {
      editor.setEditable(false);
      editContext.setIsEdit(false);
      replyContext.setIsReply(false);

      const user = await axios
        .get(
          `/api/user/${
            JSON.parse(localStorage.getItem("user")).id
          }`
        )
        .then((res) => res.data);

      // store data in database
      const storeObject = {
        content: JSON.stringify(editor.getJSON()),
        postId: postId,
        parentId: parentId,
      };
      const newReplyData = await axios.post("/api/v1/comments", storeObject, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      }).then(res=>res.data);

      replyContext.setNewReply([
        <Comment key={replyId} commentData={newReplyData} />,
        ...replyContext.newReply,
      ]);

      //set content
      editor.commands.setContent("");
    } else {
      // toggle error text editor
    }
  }
  return (
    <div className="d-flex justify-content-end gap-3 w-80 my-2 px-3">
      <button
        onClick={handleOnCancel}
        className="btn border-primary-green btn-primary-green"
      >
        Cancel
      </button>
      <button
        onClick={() => handleOnDone(parentId)}
        className="btn border-primary-green btn-primary-green"
      >
        Done
      </button>
    </div>
  );
}
