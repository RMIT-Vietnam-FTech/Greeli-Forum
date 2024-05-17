import axios from "axios";
import { useRef, useState } from "react";
import { createContext } from "react";
import useSwr from "swr";
export const AuthorizationContext = createContext(false);

const fetcher = (url) => axios.get(url).then((res) => res.data);
export const AuthorizationContextProvider = ({
	componentType,
	objectId,
	children,
}) => {
	const user = JSON.parse(localStorage.getItem("user"));
	const isAuthor = useRef(false);
	if (user == null) {
		isAuthor.current = false;
	}
	const { data, error, isLoading } = useSwr(
		`http://localhost:3001/api/v1/${componentType}s/${objectId}`,
		fetcher,
	);
	if (error) return <div>Error </div>;
	if (isLoading) return <div>is loading</div>;
	if (data) {
		if (data.createdBy.userId === user.id) {
			isAuthor.current = true;
		}
	}

	return (
		<AuthorizationContext.Provider value={{ isAuthor }}>
			{children}
		</AuthorizationContext.Provider>
	);
};
