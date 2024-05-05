import React from "react";
import HeroSection from "./Homepage/hero.jsx";
import Main from "./Homepage/main.jsx";
import Footer from "../components/footer.jsx";
import Jumbotron from "./Homepage/jumbotron.jsx";


function Homepage() {
  return (
    <div className="App">
      <HeroSection />
      <Main />
      <Jumbotron />
      <Footer />
    </div>
  );
}

export default Homepage;
