import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { BsArrowUpSquareFill } from "react-icons/bs";
export default function ButtonUpvote({ upvote, postId, commentId }) {
  async function handleUpvote() {
    const token = JSON.parse(localStorage.getItem("user")).token;
    try {
      if (isVoted) {
        const index = upvote.indexOf(user.id);
        if (index > -1) {
          console.log("desc upvote length");
          if (postId) {
            await axios.delete(
              `http://localhost:3001/api/v1/posts/${postId}/upvote`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }

          if (commentId) {
            await axios.delete(
              `http://localhost:3001/api/v1/comments/${commentId}/upvote`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }

          upvote.splice(index, 1);
          setNofUpvote((data) => data - 1);
          setIsVoted(false);
        }
      } else {
        console.log("asc upvote length");
        if (postId) {
          axios.post(
            `http://localhost:3001/api/v1/posts/${postId}/upvote`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        if (commentId) {
          await axios.post(
            `http://localhost:3001/api/v1/comments/${commentId}/upvote`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        upvote.push(user.id); //push objectID of user -> update backend
        setNofUpvote((data) => data + 1);
        setIsVoted(true);
      }
    } catch (e) {
      console.error(e.message);
    }
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const [nOfUpvote, setNofUpvote] = useState(upvote.length);
  const [isVoted, setIsVoted] = useState(upvote.includes(user.id));
  return (
    <Button
      onClick={handleUpvote}
      className=" px-3 rounded-5 text-primary-green border-primary-green bg-transparent"
    >
      {nOfUpvote}
      <BsArrowUpSquareFill className="ms-2" />
    </Button>
  );
}
