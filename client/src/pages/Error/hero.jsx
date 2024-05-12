import React from "react";
import "../../scss/custom.css";
import "../Error/style/hero.css";

export default function HeroSection() {
	return (
    <>
      <header>
        {/* This div creates the transparent overlay over the video. */}
        <div className="overlay" />
        {/* This is video for the background. */}
        <video className="header-video" autoPlay loop>
          <source src="Forest.mp4" type="video/mp4" />
        </video>
        {/* text content */}
        <div className="container d-flex h-100 text-center align-items-center">
          {/* <div className="d-flex h-100 text-center align-items-center"> */}
          <div className="w-100 text-white">
            <h1 className="display-3">
              Welcome to <span className="text-primary-yellow">Greeli</span>
            </h1>
            <p className="display-4">The guide to sustainable living</p>
          </div>
          {/* </div> */}
        </div>
      </header>
    </>
  );
}
