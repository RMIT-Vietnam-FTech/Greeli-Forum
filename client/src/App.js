import React, { createContext, useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/footer";
import Navbar from "./components/Navbar/Navbar";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import GeneralPage from "./pages/generalPage/generalPage";
function App() {
	return (
		<div className="App">
			<ThemeProvider>
				<UserContextProvider>
					<SocketContextProvider>
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
							</Routes>
						</div>
						<Footer />
					</SocketContextProvider>
				</UserContextProvider>
			</ThemeProvider>
		</div>
	);
}

export default App;
