import React from "react";
import Header from "./component/header";
import Jumbotron from "./component/jumbotron";
import Main from "./component/main";

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
