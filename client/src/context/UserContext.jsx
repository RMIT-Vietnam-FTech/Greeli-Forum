import React, { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();

export const useUserContext = () => {
	return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(localStorage.getItem("user") || null);
	const [error, setError] = useState("");
	const [profileImage, setProfileImage] = useState();
	const [searchTerm, setSearchTerm] = useState("");
	useEffect(() => {
		localStorage.setItem("user", user);
	}, [user]);

	const toggleUserInfo = () => {
		setUser(null);
	};

	return (
		<UserContext.Provider
			value={{ user, setUser, error, setError, toggleUserInfo, profileImage, setProfileImage, searchTerm, setSearchTerm }}
		>
			{children}
		</UserContext.Provider>
	);
};
