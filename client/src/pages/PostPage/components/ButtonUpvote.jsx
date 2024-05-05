import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";
export default function ButtonUpvote({ upVote }) {
  function handleUpvote() {
  const isVoted = upVote.includes('63f6bad5-33d9-4218-aada-38f7e486be3f');
    console.log("check array: "+upVote);
  console.log("check is voted: "+isVoted);
    if(isVoted){
        const index = upVote.indexOf('63f6bad5-33d9-4218-aada-38f7e486be3f');
        console.log("check index: "+ index);
        if(index>-1){
            upVote.splice(index,1);
            setNOfUpvote(data=>data-1);
        }
    }
    else{
        upVote.push('63f6bad5-33d9-4218-aada-38f7e486be3f');
        setNOfUpvote(data=>data+1);
    }
  };
  const [nOfUpvote, setNOfUpvote] = useState(upVote.length);
  return (
    <Button
      onClick={() => {
        handleUpvote();
      }}
      className=" px-3 rounded-5 text-primary-green border-primary-green bg-transparent"
    >
      <BsArrowUpSquareFill className="me-2" />
      {nOfUpvote}
    </Button>
  );
}