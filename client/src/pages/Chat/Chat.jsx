import React, { useEffect, useState } from "react";
import "./chat.css";
import { useUserContext } from "../../context/UserContext";
import axios from "axios";
import Conversation from "../../components/Conversation/Conversation";
const Chat = () => {
	const { user } = useUserContext();
	const [chats, setChats] = useState([]);
    const userId = JSON.parse(user).id;
    console.log(userId)
	useEffect(() => {
		const getChats = async () => {
			const configuration = {
				method: "get",
				url: `http://localhost:3001/api/chat/find/${userId}`,
			};
			axios(configuration)
				.then((result) => {
					// console.log(result);
                    setChats(result.data)
				})
				.catch((error) => {
					console.log(error);
				});
		};
        getChats()
	}, [user]);
	return (
		<div className="Chat">
			{/* Left Side */}
			<div className="Left-side-chat">
				<div className="Chat-container">
					<h2>Chat</h2>
					<div className="Chat-list">
                        Conversations
                        {chats.map((chat) => (
                            <div>
                                <Conversation data={chat} currentUserId={userId} />
                            </div>
                        ))}
                    </div>
				</div>
			</div>
			{/* Right Side */}
			<div></div>
		</div>
	);
};
export default Chat;
