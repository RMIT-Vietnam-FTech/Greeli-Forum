import React, { createContext, useContext, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer.jsx";
import Homepage from "./pages/Homepage.js";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import { ThemeProvider } from "./themeContext.js";

function App() {
	return (
		<div className="App">
			<ThemeProvider>
				<Navbar />
				<div className="h-100" style={{ marginTop: "80px" }}>
					<Login />
					<Register />
				</div>
				<Footer />
			</ThemeProvider>
		</div>
	);
}

export default App;
