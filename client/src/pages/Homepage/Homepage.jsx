import React from "react";
import Header from "./component/header.jsx";
import Main from "./component/main.jsx";
import Jumbotron from "./component/jumbotron.jsx";

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
