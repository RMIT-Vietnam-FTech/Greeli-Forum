import React from "react"
import { Routes, Route, useParams } from 'react-router-dom';
import axios from "axios";
export default function ThreadPage(){
 let{threadId} = useParams();
 console.log(threadId);
 axios.get('http://localhost:9000/threads'/*/{theadId}*/).then(res=>{
    //const thread = res.data;
    const thread = res.data[threadId-1];
 })
 return(
    <></>
 );
}