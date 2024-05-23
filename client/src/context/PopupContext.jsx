import { createContext, useContext, useState } from "react";

const PopupContext= createContext();

function PopupContextProvider({ children }) {
	const [isPopup, setIsPopup] = useState(false);
	return (
		<PopupContext.Provider value={{ isPopup, setIsPopup}}>
			{children}
		</PopupContext.Provider>
	);
}
export { PopupContext, PopupContextProvider};
