import axios from "axios";
import { useContext, useState } from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";

import { PopupContext } from "../../context/PopupContext";
import { useLogin } from "../../hooks/useLogin";

axios.defaults.withCredentials = true;

export default function ButtonUpvote({ upvote, postId, commentId }) {
	const isLogin = useLogin();
	const popupContext = useContext(PopupContext);
	async function handleUpvote() {
		try {
			if (!isLogin) {
				popupContext.setIsPopup(true);
			} else {
				const token = JSON.parse(localStorage.getItem("user")).token;
				if (isVoted) {
					const index = upvote.indexOf(user.id);
					if (index > -1) {
						if (postId) {
							await axios.delete(
								`http://localhost:3001/api/v1/posts/${postId}/upvote`,
								{
									//   headers: {
									//     Authorization: `Bearer ${token}`,
									//   },
								},
							);
						}

						if (commentId) {
							await axios.delete(
								`http://localhost:3001/api/v1/comments/${commentId}/upvote`,
								{
									// headers: {
									//   Authorization: `Bearer ${token}`,
									// },
								},
							);
						}

						upvote.splice(index, 1);
						setNofUpvote((data) => data - 1);
						setIsVoted(false);
					}
				} else {
					if (postId) {
						axios.post(
							`http://localhost:3001/api/v1/posts/${postId}/upvote`,
							{},
							{
								// headers: {
								//   Authorization: `Bearer ${token}`,
								// },
							},
						);
					}

                   if (commentId) {
                       await axios.post(
                           `http://localhost:3001/api/v1/comments/${commentId}/upvote`,
                           {},
                           {
                               // headers: {
                               //   Authorization: `Bearer ${token}`,
                               // },
                           },
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
           tabIndex="0"
           onClick={handleUpvote}
           className="text-decoration-none text-forum-emphasis border border-primary-green px-2  bg-transparent"
           style={{borderRadius:"20px", height:"25px"}}

       >
           {nOfUpvote}
          <BsArrowUpSquareFill size={14} className="ms-2 mb-1" />
       </button>
   );
}
