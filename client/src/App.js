import React, { createContext, useContext, useState, useEffect } from "react";
import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useRoutes,
} from "react-router-dom";
import "./App.css";
import RequireAuth from "./components/Auth/RequireAuth.jsx";
import RequireActivate from "./components/Auth/RequireActivate.jsx";
import Footer from "./components/Footer/footer";
import Navbar from "./components/Navbar/Navbar";
import ChatBubble from "./components/ChatBubble/ChatBubble.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import ScrollToTop from "./components/Scroll/ScrollToTop.jsx";
import Chat from "./pages/Chat/Chat";
import ContactPage from "./pages/ContactPage/Contact.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Profile from "./pages/Profile/Profile";
import ProfileUpdate from "./pages/ProfileUpdate";
import GeneralPage from "./pages/generalPage/generalPage";
import Upload from "./pages/UploadImage/Upload.jsx";
import Sitemap from "./pages/Sitemap/Sitemap.jsx";
import { ForumRouter } from "./pages/Forum/ForumRouter.jsx";
import Cookies from "./components/Cookies/Cookie.jsx";
// import { useUserContext } from "./context/UserContext.jsx";
import routesConfig from "./routesConfig.jsx";
function App() {
	let location = useLocation();
	const [isForum, setIsForum] = useState(false);
	const routes = useRoutes(routesConfig);
	// const { user } = useUserContext();
	// const isActivated = JSON.parse(user)?.isActivated;
	useEffect(() => {
		console.log(
			`check location pathname: ${location.pathname}\n check isForum: ${isForum}`
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
