import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";
export default function ButtonUpvote({ upvote}) {
  function handleUpvote() {
  const isVoted = upvote.includes('63f6bad5-33d9-4218-aada-38f7e486be3f');
    if(isVoted){
        const index = upvote.indexOf('63f6bad5-33d9-4218-aada-38f7e486be3f');
        console.log("check index: "+ index);
        if(index>-1){
            upvote.splice(index,1);
            setNOfUpvote(data=>data-1);
        }
    }
    else{
        upvote.push('63f6bad5-33d9-4218-aada-38f7e486be3f');
        setNOfUpvote(data=>data+1);
    }
  };
  const [nOfUpvote, setNOfUpvote] = useState(upvote.length);
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