import React from "react";
import Header from "./component/Header";
import Jumbotron from "./component/Jumbotron";
import Main from "./component/Main";
import SearchBar from "../../components/Search/Search";

function Homepage() {
	return (
		<div className="App">
			<Header />
			<Main />
			<Jumbotron />
			{/* <SearchBar /> */}
		</div>
	);
}

export default Homepage;
