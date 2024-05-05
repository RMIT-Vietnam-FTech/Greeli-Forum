import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext({
    isDarkMode: false,
    toggleDarkMode: () => {},
});

function ThemeProvider ({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(
        () => localStorage.getItem("theme") === "dark" || false
    );

    useEffect(() => {
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeContext.Provider value={{isDarkMode, toggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}
export {ThemeContext, ThemeProvider};