import React, { createContext, useContext, useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useRoutes } from "react-router-dom";
import "./App.css";
import RequireAuth from "./components/Auth/RequireAuth.jsx";
import RequireActivate from "./components/Auth/RequireActivate.jsx";
import Footer from "./components/Footer/footer";
import Navbar from "./components/Navbar/Navbar";
import ChatBubble from "./components/ChatBubble/ChatBubble.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import ScrollToTop from "./components/Scroll/ScrollToTop.jsx";
import Cookies from "./components/Cookies/Cookie.jsx";
// import { useUserContext } from "./context/UserContext.jsx";
import routesConfig from "./routesConfig.jsx";
function App() {
	let location = useLocation();
	const [isForum, setIsForum] = useState(false);
  const routes = useRoutes(routesConfig)
	// const { user } = useUserContext();
	// const isActivated = JSON.parse(user)?.isActivated;
	useEffect(() => {
		console.log(
			`check location pathname: ${location.pathname}\n check isForum: ${isForum}`,
		);
		if (location.pathname.split("/")[1] === "forum") {
			setIsForum(true);
		} else {
			setIsForum(false);
		}
	}, [location.pathname]);

	return (
    <div className="App w-100">
      <ThemeProvider>
        <UserContextProvider>
          <Navbar isForum={isForum} />
          <div className="h-100" style={{ marginTop: "80px" }}>
            <ScrollToTop />
            {routes}
          </div>
          <Footer />
          <ChatBubble />
          <Cookies />
          <div id="popup-root"></div>
        </UserContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;