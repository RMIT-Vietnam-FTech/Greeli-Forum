import React, { createContext, useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/footer";
import MessageContainer from "./components/Message/MessageContainer.jsx";
import Navbar from "./components/Navbar/Navbar";
import SideBar from "./components/SideBar/SideBar.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import Chat from "./pages/Chat/Chat";
import DashBoardPage from "./pages/Forum/DashBoardPage.jsx";
import PostPage from "./pages/Forum/PostPage/PostPage.jsx";
import ThreadPage from "./pages/Forum/ThreadPage/ThreadPage.jsx";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Testing from "./pages/Testing/testing.jsx";
import GeneralPage from "./pages/generalPage/generalPage";
function App() {
	return (
		<div className="App">
			<ThemeProvider>
				<UserContextProvider>
					<SocketContextProvider>
						<Navbar />
						<div style={{ marginTop: "100px" }}>
							<Routes>
								<Route path="/" element={<Homepage />} />
								<Route path="/login" element={<Login />} />
								<Route
									path="/register"
									element={<Register />}
								/>
								<Route
									path="/general"
									element={<GeneralPage />}
								/>
								<Route path="/chat" element={<Chat />} />
								<Route path="/forum">
									<Route index element={<DashBoardPage />} />
									<Route
										path="testing"
										element={<Testing />}
									/>
									<Route
										path="threads/:threadId"
										element={<ThreadPage />}
									/>
									<Route
										path="posts/:postId"
										element={<PostPage />}
									/>
								</Route>
							</Routes>
						</div>
						<Footer />
					</SocketContextProvider>
				</UserContextProvider>
			</ThemeProvider>
			{/* <SideBar /> */}
			{/* <MessageContainer /> */}
		</div>
	);
}

export default App;
