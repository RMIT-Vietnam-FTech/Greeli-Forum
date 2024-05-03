import React from "react"
import { Routes, Route, useParams } from 'react-router-dom';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import CardTitle from "react-bootstrap/esm/CardTitle";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import './thread.scss';
export default function ThreadPage(){
 let{threadId} = useParams();
 console.log(threadId);
 let threadData = null;
 let threadRule = null;
 axios.get('http://localhost:9000/threads'/*/{theadId}*/).then(res=>{
    //const thread = res.data;
    threadData = res.data[threadId-1];
 })
 axios.get('http://localhost:9000/threads/1/rule').then(
    res=> {
        threadRule = res.data;
        console.log("thread rule: "+ threadRule);
    }
 );//1 replace = threadID after have real data.
 return(
  <>
  <div className="left-sidebar"></div>
  <section className="thread">
   <Card className="thread-item">
      
   </Card>
   <Button>follow thread</Button>
   <section className="thread-item">

   </section>
  </section>
  <div className="right-sidebar">
   
  </div>
  </>  
 );
}