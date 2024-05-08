import React from "react";
import HeroSection from "./hero.jsx";
import Jumbotron from "./jumbotron.jsx";
import Main from "./main.jsx";

function Homepage() {
	return (
		<div className="App">
			<HeroSection />
			<Main />
			<Jumbotron />
		</div>
	);
}

export default Homepage;
