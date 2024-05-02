import React from "react";
import HeroSection from "../components/hero.jsx";
import Footer from "../components/footer.jsx";
import Jumbotron from "../components/jumbotron.jsx";

function Homepage() {
  return (
    <div className="App">
      <HeroSection />
      <Jumbotron />
      <Footer />
    </div>
  );
}

export default Homepage;
