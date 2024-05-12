import React from "react";
import "../style/jumbotron.css";

export default function Jumbotron() {
	return (
    <>
      <div className="jumbotron container-fluid w-100 py-5 text-center">
        <h1 className="text-light text-center pb-lg-5 pb-sm-3">
          Wanna be a part of our community builder team?
        </h1>
        <div className="d-block">
          <button
            className="fw-bold bg-primary-green text-light text-center btn btn-lg rounded-pill"
            type="button"
          >
            Join Us Here
          </button>
        </div>
      </div>
    </>
  );
}
