import React from "react";
import Header from "./component/Header";
import Main from "./component/Main";
import Jumbotron from "./component/Jumbotron";

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
