import { Children, createContext, useContext } from "react";

const SortingContext = createContext();
function useSortingContext() {
	return useContext(SortingContext);
}
export default function SortingContextProvider({ children }) {
	const [sortOption, setSortOption] = useState("Hot");
	return (
		<SortingContext.Provider value={{ sortOption, setSortOption }}>
			{children}
		</SortingContext.Provider>
	);
}
