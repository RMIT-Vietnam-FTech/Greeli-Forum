import React, { createContext, useContext, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/footer";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Chat from "./pages/Chat/Chat";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import GeneralPage from "./pages/generalPage/generalPage";
import { Routes, Route, Navigate } from "react-router-dom";
import MessageContainer from "./components/Message/MessageContainer.jsx";
import DashBoardPage from "./pages/DashBoardPage.jsx";
import ThreadPage from "./pages/ThreadPage/ThreadPage.jsx";
import PostPage from "./pages/PostPage/PostPage.jsx";
function App() {
	return (
		<div className="App">
			<ThemeProvider>
				<UserContextProvider>
						<Navbar />
						<div className="h-100" style={{ marginTop: "80px" }}>
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
                  <Route index element={<DashBoardPage/>}/>
                  <Route path="threads/:threadId" element={<ThreadPage />} />
                  <Route path="posts/:postId" element={<PostPage />} />
                </Route>
							</Routes>
						</div>
						<Footer />
				</UserContextProvider>
			</ThemeProvider>
			{/* <SideBar /> */}
			{/* <MessageContainer /> */}
		</div>
	);
}

export default App;
