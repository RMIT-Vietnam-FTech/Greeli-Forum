import axios from "axios";
import useSWR from "swr";
import {useParams } from "react-router-dom";
import { useState } from "react";

import TextEditor from "../TextEditor/TextEditor";
import Comment from "./Comment";
import AuthComponent from "../AuthComponent";

import CommentContext from "../../../contexts/CommentContext";

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function Comments() {
  const { postId } = useParams();
  const [newComment, setNewComment] = useState([]);
  const { data, error, isLoading } = useSWR(
    "http://localhost:9000/api/v1/comments?postId=" + postId + "&parentId=null",
    fetcher
  );
  if (error) {
    return "error";
  }
  if (isLoading) {
    return "is loading";
  }
  return (
    <>
    <CommentContext.Provider value={{newComment, setNewComment}}>
      <AuthComponent componentType="comments" unAuthorizedProcess={true}>
        <div className="cursor-text mt-4 text-editor">
          <TextEditor
            content=""
            toggleIsEditOnClick={true}
            resetClickDone={true}
          />
        </div>
      </AuthComponent>
    </CommentContext.Provider>
      <section className="mt-3 w-100">
        {newComment}
        {data.map((commentData) => {
          return <Comment key={commentData._id} commentData={commentData} />;
        })}
      </section>
    </>
  );
}
