import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import useSWR from "swr";
import Button from "react-bootstrap/Button";
import "./thread.scss";
import { DarkThemeContext } from "../../DarkThemeContext";
import { useContext } from "react";
import ThreadHeader from "./components/ThreadHeader";
import ThreadBody from "./components/ThreadBody";
const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function ThreadPage() {
  let { threadId } = useParams();
  const { data, error, isLoading } = useSWR(
    "http://localhost:9000/threads",
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
      <section className="thread">
        <ThreadHeader title={data[threadId].title} uploadFile={data[threadId].uploadFile} content={data[threadId].content}/>
        <section className="thread-body">
         <ThreadBody posts={data[threadId].posts}/>
        </section>
      </section>
      <section className="right-sidebar"></section>
    </>
  );
}

function ThreadRule() {}
