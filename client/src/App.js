import React, { createContext, useState } from "react";
import "./App.css";
import Homepage from "./pages/Homepage.js";
import Navbar from './components/Navbar/Navbar';
import Login from "./pages/Login/Login";
import Register from './pages/Login/Register';

export const ThemeContext = createContext("light");
function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
          <div className="App" data-bs-theme={theme}>
      <Login />
      <Register />
      {/* <Register /> */}
      {/* <Homepage /> */}
      <Navbar />
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
