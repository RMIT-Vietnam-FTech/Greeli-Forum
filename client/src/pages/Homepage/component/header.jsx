import React from "react";
import "../style/header.css";

const Header = () => {
  return (
    <header>
      {/* This div creates the transparent overlay over the video. */}
      <div className="overlay w-10 h-100" >
      </div>

      {/* Video Background */}
      <video className="header-video h-100 w-100" autoPlay muted loop>
        <source src="Forest.mp4" type="video/mp4"/>
      </video>

      {/* Content */}
      <div className="text-center">
        <div className="text-white">
          <h1 className="display-3">
            Welcome to <span className="text-primary-yellow">Greeli</span>
          </h1>
          <p className="display-4">The guide to sustainable living</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
