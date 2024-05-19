import React, { createContext, useContext, useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import RequireAuth from "./components/Auth/RequireAuth.jsx";
import Footer from "./components/Footer/footer";
import Navbar from "./components/Navbar/Navbar";
import LoginPopup from "./components/Popup/LoginPopup.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import ScrollToTop from "./components/Scroll/ScrollToTop.jsx";
import Chat from "./pages/Chat/Chat";
import ContactPage from "./pages/ContactPage/Contact.jsx";
import DashBoardPage from "./pages/Forum/DashBoardPage.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Profile from "./pages/Profile/Profile";
import GeneralPage from "./pages/generalPage/generalPage";
import PostPage from "./pages/Forum/PostPage/PostPage.jsx";
import ThreadPage from "./pages/Forum/ThreadPage/ThreadPage.jsx";
import Upload from "./pages/UploadImage/Upload.jsx";
import Sitemap from "./pages/Sitemap/Sitemap.jsx";
function App() {
	let location = useLocation();
	const [isForum, setIsForum] = useState(false);
	useEffect(() => {
		if (location.pathname === "/forum") {
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
						<Routes>
							<Route path="/" element={<Homepage />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/general" element={<GeneralPage />} />
							<Route path="/contact" element={<ContactPage />} />
							<Route path="/upload" element={<Upload />} />
							<Route path="/user/:userId" element={<Profile />} />
							<Route path="/sitemap" element={<Sitemap />}/>
							<Route element={<RequireAuth />}>
								<Route path="/profile" element={<Profile />} />
								<Route path="/chat" element={<Chat />} />
							</Route>
							<Route path="/forum">
								<Route index element={<DashBoardPage />} />
								<Route path="threads/:threadId" element={<ThreadPage />} />
								<Route path="posts/:postId" element={<PostPage />} />
							</Route>
							<Route path="*" element={<ErrorPage />} />
						</Routes>
					</div>
					<Footer />
				</UserContextProvider>
			</ThemeProvider>
		</div>
	);
}

export default App;
