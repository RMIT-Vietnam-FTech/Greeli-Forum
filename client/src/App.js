import React, { createContext, useContext, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/footer";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import { ThemeProvider } from "./themeContext.js";
import GeneralPage from './pages/generalPage/generalPage';
function App() {
	return (
		<div className="App">
			<ThemeProvider>
				<Navbar />
				<div className="h-100" style={{ marginTop: "80px" }}>
          {/* <Homepage /> */}
					{/* <Login /> */}
					<Register />
          <GeneralPage />
				</div>
				<Footer />
			</ThemeProvider>
		</div>
	);
}

export default App;