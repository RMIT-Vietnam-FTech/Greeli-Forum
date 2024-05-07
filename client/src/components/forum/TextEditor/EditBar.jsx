import { useContext, useId, useRef } from "react";

import AuthContext from "../../../contexts/AuthContext";
import ReplyContext from "../../../contexts/ReplyContext";
import CommentContext from "../../../contexts/CommentContext";

import { useCurrentEditor } from "@tiptap/react";

import Comment from "../Comment/Comment";
import { json } from "react-router-dom";
export default function EditBar({ content, reset }) {
  const authContext = useContext(AuthContext);
  const replyContext = useContext(ReplyContext);
  const commentContext = useContext(CommentContext);
  const commentId = useId();
  const replyId = useId();
  const { editor } = useCurrentEditor();
  if (!editor.isEditable) {
    editor.setEditable(true);
  }
  function handleOnCancel() {
    editor.setEditable(false);
    authContext.toggleIsEdit();
    editor.commands.setContent(content);
    if(authContext.componentType == "replies"){
      replyContext.setIsReply(isReply=>!isReply);
    }
  }
  function handleOnDone(reset) {
    if(editor.getText()){
    editor.setEditable(false);
    authContext.toggleIsEdit();
    if(authContext.componentType=="comments"){
      let newCommentObject = {
        content:editor.getJSON(),
        upvote: [],
        replies: [],
        createBy: {
          username: authContext.username,
          profileImage: authContext.profileImage
        }
      }
      // console.log("check new comment object: " + JSON.stringify(newCommentObject));
      // console.log("check content: "+JSON.stringify(newCommentObject.content));
      commentContext.setNewComment([<Comment key={commentId} commentData={newCommentObject}/>, ...commentContext.newComment ]);
    }
    if(authContext.componentType == "replies"){
      let newReplyObject = {
        content:editor.getJSON(),
        upvote: [],
        replies: [],
        createBy: {
          username: authContext.username,
          profileImage: authContext.profileImage
        }
      }
      replyContext.setIsReply(isReply=>!isReply);
      replyContext.setNewReply([<Comment key={replyId} commentData={newReplyObject}/>, ...replyContext.newReply])
    }
    if (reset) {
      editor.commands.clearContent();
    }
    // store data in database
    //command PUT or POST  on what link
    //--> POST when edit, PUT when create, pass type and
    }
    else{
      // toggle error text editor
    }
  }
  return (
    <div className="d-flex justify-content-end gap-3 w-80 mx-auto px-3">
      <button
        onClick={handleOnCancel}
        className="btn border-primary-green btn-primary-green"
      >
        Cancel
      </button>
      <button
        onClick={() => handleOnDone(reset)}
        className="btn border-primary-green btn-primary-green"
      >
        Done
      </button>
    </div>
  );
}
