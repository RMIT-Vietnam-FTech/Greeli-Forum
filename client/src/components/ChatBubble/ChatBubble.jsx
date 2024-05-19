import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ChatBubble.css';

const ChatBubble = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        navigate('/chat');
    };

    //Not display the bubble on the chat page
    if (location.pathname === '/chat' || location.pathname === '/login') {
        return null;
    }

    return (
        <div className="chat-bubble" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
                <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
            </svg>
        </div>
    );
};

export default ChatBubble;
