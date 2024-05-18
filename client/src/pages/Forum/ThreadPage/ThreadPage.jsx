import React from "react";
import { useParams } from "react-router-dom";
import "../assets/forum.scss";

import ThreadHeader from "./ThreadHeader";
import NewPostPopUp from "./components/NewPostPopUp";

import axios from "axios";
import useSwr from "swr";
import AuthLeftSideBar from "../../../components/forum/AuthLeftSideBar";
import LeftSideBar from "../../../components/forum/EditTextEditor/LeftSideBar";
import ThreadBody from "./ThreadBody";

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function ThreadPage() {
  const { threadId } = useParams();
  const path = `/api/v1/threads/${threadId}`;
  const { data, error, isLoading } = useSwr(path, fetcher);
  if (error) {
    return <div>is error</div>;
  }
  if (isLoading) {
    return <div>is loading</div>;
  }
  return (
    <>
      <section className="container">
        <section className="left-sidebar">
          {localStorage.getItem("user") ? <AuthLeftSideBar /> : <LeftSideBar />}
        </section>
        <section className="main-container">
          <section className="main">
            <ThreadHeader
              title={data.title}
              uploadFile={data.uploadFile}
              content={data.content}
              objectId={data._id}
            />
            <ThreadBody threadData={data} />
          </section>
          <section className="right-sidebar"></section>
        </section>
      </section>
    </>
  );
}
