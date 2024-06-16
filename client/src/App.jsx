import React, { createContext, useContext, useState, useEffect } from "react";
import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useRoutes,
} from "react-router-dom";
import "./App.css";
import ChatBubble from "./components/ChatBubble/ChatBubble.jsx";
import Cookies from "./components/Cookies/Cookie.jsx";
import Footer from "./components/Footer/footer.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import ScrollToTop from "./components/Scroll/ScrollToTop.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";

// import { ForumRouter } from "./pages/Forum/ForumRouter.jsx";
// import { useUserContext } from "./context/UserContext.jsx";
import routesConfig from "./routesConfig.jsx";

function App() {
	const location = useLocation();
	const [isForum, setIsForum] = useState(false);
	const routes = useRoutes(routesConfig);
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
						{/* <ScrollToTop /> */}
						{routes}
					</div>
					<Footer />
					<ChatBubble />
					<Cookies />
					<div id="popup-root" />
				</UserContextProvider>
			</ThemeProvider>
		</div>
	);
}

export default App;
