import "../forum.scss";
import axios from "axios";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import PostHeader from "./PostHeader";
import Button from "react-bootstrap/esm/Button";
export default function PostPage() {
  const { postId } = useParams();
  return(
    <>
      <section className="left-sidebar"></section>
      <section className="main">
        <PostHeader postId={postId}/>
        <Button className="w-100 my-4 px-4 py-2 bg-transparent border-primary-green-900 text-primary-green rounded-5 text-start ">Comment...</Button>
        <PostBody/>
      </section>
      <section className="right-sidebar"></section>
    </>
  );
}

function PostBody(){

}