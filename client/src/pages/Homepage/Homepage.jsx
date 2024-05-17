import React from "react";
import Header from "./component/Header";
import Jumbotron from "./component/Jumbotron";
import Main from "./component/Main";

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
