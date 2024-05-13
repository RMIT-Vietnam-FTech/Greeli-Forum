import { createContext, useState } from "react";
export const EditContext = createContext();
export function EditContextProvider({ children }) {
	const [isEdit, setIsEdit] = useState(false);
	return (
		<EditContext.Provider value={{ isEdit, setIsEdit }}>
			{children}
		</EditContext.Provider>
	);
}
