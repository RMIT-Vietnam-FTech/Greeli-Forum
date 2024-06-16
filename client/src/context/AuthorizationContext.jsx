import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { createContext } from "react";
import useSwr from "swr";
export const AuthorizationContext = createContext(false);
axios.defaults.withCredentials = true;

const fetcher = (url) => axios.get(url).then((res) => res.data);
export const AuthorizationContextProvider = ({
	componentType,
	objectId,
	children,
}) => {
	const user = JSON.parse(localStorage.getItem("user"));
	const isAuthor = useRef(false);
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	});
	if (user == null) {
		isAuthor.current = false;
	}
	const { data, error, isLoading } = useSwr(
		componentType || objectId
			? baseUrl + `/api/v1/${componentType}s/${objectId}`
			: null,
		fetcher,
	);
	if (error) return <div>Error </div>;
	if (isLoading) return <div>is loading</div>;
	if (data) {
		if (localStorage.getItem("user") == "null") {
			isAuthor.current = false;
		} else if (data.createdBy.userId === user.id) {
			isAuthor.current = true;
		}
	}

	return (
		<AuthorizationContext.Provider value={{ isAuthor }}>
			{children}
		</AuthorizationContext.Provider>
	);
};
