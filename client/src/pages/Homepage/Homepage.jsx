import React from "react";
import Header from "./component/Header.jsx";
import Jumbotron from "./component/Jumbotron.jsx";
import Main from "./component/Main.jsx";

function Homepage() {
	return (
		<div className="App">
			<Header />
			<Main />
			<Jumbotron />
		</div>
	);
}

export default Homepage;
