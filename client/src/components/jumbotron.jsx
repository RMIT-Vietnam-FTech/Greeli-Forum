import React from "react";
import "../style/jumbotron.css";

export default function Jumbotron() {
    return (
      <>
        <div className="jumbotron-container">
          <div className="text-center py-5">
            <h1 className="text-light">
              Wanna be a part of our community builder team?
            </h1>
            <div className="d-inline-flex gap-2 py-4">
              <button
                className="d-inline-flex align-items-center btn btn-light btn-lg px-5 py-4 rounded-pill fw-bold"
                type="button"
              >
                Join us here
              </button>
            </div>
          </div>
        </div>
      </>
    );
}