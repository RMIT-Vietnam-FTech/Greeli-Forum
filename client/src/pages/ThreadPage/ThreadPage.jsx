import "../forum.scss";

import React from "react";
import { useParams } from "react-router-dom";

import AuthComponent from "../../components/forum/AuthComponent";
import ThreadHeader from "./ThreadHeader";

import ThreadBody from "./ThreadBody";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function ThreadPage() {
  const { threadId } = useParams();
  const { data, error, isLoading } = useSWR(
    `http://localhost:9000/api/v1/threads/${threadId}`,
    fetcher
  );
  if (error) {
    return 0;
  }
  if (isLoading) {
    return 0;
  }
  return (
    <section className="container">
        <section className="left-sidebar"></section>
        <section className="main-container">
          <section className="main">
            <ThreadHeader
              title={data.title}
              uploadFile={data.uploadFile}
              content={data.content}
              objectId={data._id}
            />
            <ThreadBody posts={data.posts} />
          </section>
          <section className="right-sidebar"></section>
        </section>
    </section>
  );
}
