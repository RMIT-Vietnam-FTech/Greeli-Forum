import { useContext } from "react";
import SyncLoader from "react-spinners/SyncLoader.js";
import { ThemeContext } from "../../context/ThemeContext";

const LoadSpinner = () => {
    const {isDarkMode} = useContext(ThemeContext);
    return(
        <div className="vh-100 d-flex justify-content-center align-items-center bg-greeli-subtle" data-bs-theme={isDarkMode ? "dark" : "light"}>
            <SyncLoader color={isDarkMode ? "#dcb968" : "#365949"} />
        </div>
    )
}

export default LoadSpinner;