import "../forum.scss";
import axios from "axios";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import PostHeader from "./components/PostHeader";
import PostBody from "./components/PostBody";
import TextEditor from "../../components/TextEditor/TextEditor";
import { useCurrentEditor, EditorProvider, useEditor } from "@tiptap/react";
const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function PostPage() {
  const { postId } = useParams();
  function useHandleTexEditor(){
const { editor } = useCurrentEditor();
  editor.setEditable(true);
    console.log("hello");
  }
  const { data, error, isLoading } = useSWR(
    "http://localhost:9000/api/v1/posts/" + postId,
    fetcher
  );
  if (error) {
    return 0;
  }
  if (isLoading) {
    return 0;
  }
  if (data.isApproved) {
    return (
      <>
        <section className="left-sidebar"></section>
        <section className="main">
          <PostHeader
            title={data.title}
            content={data.content}
            uploadFile={data.uploadFile}
            username={data.createBy.username}
            profileImage={data.createBy.profileImage}
            threadName={data.threadName}
            upVote={data.upVote}
          />
          <div className="cursor-text mt-4 text-editor">
          <TextEditor content="" crudType="PUT" componentType="comments" editableStatus={false} allowClickToEditable={true} resetContentWhenDone={false}/>
          </div>
          <PostBody comments={data.comments}/>
        </section>
        <section className="right-sidebar"></section>
      </>
    );
  }
  return <></>;
}

