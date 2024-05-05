import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import useSWR from "swr";
import Button from "react-bootstrap/Button";
import "../forum.scss";
import { DarkThemeContext } from "../../DarkThemeContext";
import { useContext } from "react";
import ThreadHeader from "./components/ThreadHeader";
import ThreadBody from "./components/ThreadBody";
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
    <>
      <section className="left-sidebar"></section>
      <section className="main">
        <ThreadHeader title={data.title} uploadFile={data.uploadFile} content={data.content}/>
         <ThreadBody posts={data.posts}/>
      </section>
      <section className="right-sidebar"></section>
    </>
  );
}

function ThreadRule() {}
