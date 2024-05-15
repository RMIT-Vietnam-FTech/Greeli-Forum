import React from "react";
import Header from "./component/header";
import Main from "./component/main";
import Jumbotron from "./component/jumbotron";

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
