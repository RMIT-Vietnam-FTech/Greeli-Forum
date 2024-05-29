import { createContext, useContext } from "react";

export const ProfileContext = createContext();

export const useProfileContext = () => {
	const profile = useContext(ProfileContext);
	if (profile === undefined) {
		throw new Error("Can not fetch the user data");
	}
	return profile;
};
