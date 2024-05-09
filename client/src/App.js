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
