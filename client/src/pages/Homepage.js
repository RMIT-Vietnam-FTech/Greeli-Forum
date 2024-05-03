import React from "react";
import HeroSection from "../components/hero.jsx";
import Main from "../components/main.jsx";
import Footer from "../components/footer.jsx";
import Jumbotron from "../components/jumbotron.jsx";

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
