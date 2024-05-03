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
            <div className="d-inline-flex pt-5">
              <button
                className="d-inline-flex align-items-center text-green-500 btn bg-white btn-lg px-5 py-3 my-3 rounded-pill"
                type="button"
              >
                Call to action
              </button>
            </div>
          </div>
        </div>
      </>
    );
}