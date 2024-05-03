import React from "react";
import "../style/hero.css";

export default function HeroSection() {
  return (
    <>
      <header>
        {/* This div creates the transparent overlay over the video. */}
        <div className="overlay" />
        {/* This is video for the background. */}
        <video
          playsInline="playsinline"
          autoPlay="autoplay"
          muted="muted"
          loop="loop"
        >
          <source
            src="https://www.youtube.com/watch?v=eNUpTV9BGac&t=1324s"
            type="video/mp4"
          />
        </video>
        {/* text content */}
        <div className="container d-flex h-100 text-center align-items-center">
          {/* <div className="d-flex h-100 text-center align-items-center"> */}
          <div className="w-100 text-white">
            <h1 className="display-3">
              Welcome to <span className="text-yellow-500">Greeli</span>
            </h1>
            <p className="display-4">The guide to sustainable living</p>
          </div>
          {/* </div> */}
        </div>
      </header>
    </>
  );
}
