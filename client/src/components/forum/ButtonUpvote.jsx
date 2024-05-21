import axios from "axios";
import { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { BsArrowUpSquareFill } from "react-icons/bs";
import {PopupContext} from "../../context/PopupContext";
import LoginPopup, { useLogin } from "../Popup/LoginPopup";
export default function ButtonUpvote({ upvote, postId, commentId }) {
  const isLogin = useLogin();
  const popupContext = useContext(PopupContext);
  async function handleUpvote() {
    try {
      if (!isLogin) {
        console.log("ceck popup state: "+ popupContext.isPopup)
        popupContext.setIsPopup(true);
      } else {
        const token = JSON.parse(localStorage.getItem("user")).token;
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
      }
    } catch (e) {
      console.error(e.message);
    }
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const [nOfUpvote, setNofUpvote] = useState(upvote.length);
  const [isVoted, setIsVoted] = useState(user && upvote.includes(user.id));
  return (
    <button
      onClick={handleUpvote}
      className="text-decoration-none text-error-emphasis border border-primary-green px-2 rounded-5 bg-transparent"
    >
      {nOfUpvote}
      <BsArrowUpSquareFill className="ms-2" />
    </button>
  );
}
