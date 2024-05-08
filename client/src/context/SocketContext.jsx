import { createContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const {user} = useUserContext();

    useEffect(() => {
        if (user) {
            const socket = io("http://localhost:5000");
            setSocket(socket)
        }
    })

	return (
		<SocketContext.Provider value={{}}>{children}</SocketContext.Provider>
	);
};
