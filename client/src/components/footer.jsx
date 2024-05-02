import React from "react";      
import "../style/footer.css";
import { FaFacebook } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { AiFillInstagram } from "react-icons/ai";
import { AiOutlineTikTok } from "react-icons/ai";
import "../scss/custom.css";


export default function Footer() {
    return (
      <>
        <footer className="bd-footer body-bg">
          <div className="container">
            <footer className="pt-5">
              <div className="row gx-5">
                {/* Who are we Section */}
                <div className="col-4 mt-3 mb-2 px-3">
                  <h3 className="fw-bold text-light">Who are we</h3>
                  <p className="text-light">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellendus itaque earum, laudantium fugiat officiis odit
                    ullam aut delectus ea magnam.
                  </p>
                  <img
                    src="logo.svg"
                    alt="greeli logo"
                    width={100}
                    className="mt-5"
                  />
                </div>

                {/* Important Link Section*/}
                <div className="col-4 mt-3 mb-2 px-5">
                  <h3 className="fw-bold text-light px-5">Important Link</h3>
                  <ul className="nav flex-column">
                    <li className="nav-item mb-2 px-5">
                      <a href="#" className="nav-link p-0 text-light">
                        Home
                      </a>
                    </li>
                    <li className="nav-item mb-2 px-5">
                      <a href="#" className="nav-link p-0 text-light">
                        General
                      </a>
                    </li>
                    <li className="nav-item mb-2 px-5">
                      <a href="#" className="nav-link p-0 text-light">
                        Forum
                      </a>
                    </li>
                    <li className="nav-item mb- px-5">
                      <a href="#" className="nav-link p-0 text-light">
                        About
                      </a>
                    </li>
                    <li className="nav-item mb-2 px-5">
                      <a href="#" className="nav-link p-0 text-light">
                        Contact
                      </a>
                    </li>
                    <li className="nav-item mb-2 px-5">
                      <a href="#" className="nav-link p-0 text-light">
                        Profile
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Contact Info Section*/}
                <div className="col-4 mt-3 mb-2 px-3">
                  <h3 className="fw-bold text-light">Contact Info</h3>
                  <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                      <a
                        href="#"
                        className="nav-link d-flex align-items-center gap-2 p-0 text-light"
                      >
                        <GrMail size={20} />
                        business@greeli@gmail.com.vn
                      </a>
                    </li>
                    <li className="nav-item mb-2">
                      <a
                        href="#"
                        className="nav-link d-flex align-items-center gap-2 p-0 text-light"
                      >
                        <FaFacebook size={20} />
                        business@greeli@gmail.com.vn
                      </a>
                    </li>
                    <li className="nav-item mb-2">
                      <a
                        href="#"
                        className="nav-link d-flex align-items-center gap-2 p-0 text-light"
                      >
                        <AiFillInstagram size={20} />
                        business@greeli@gmail.com.vn
                      </a>
                    </li>
                    <li className="nav-item mb-2">
                      <a
                        href="#"
                        className="nav-link d-flex align-items-center gap-2 p-0 text-light"
                      >
                        <AiOutlineTikTok size={20} />
                        business@greeli@gmail.com.vn
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* copyright of Greeli */}
              <div className="d-flex flex-row flex-wrap justify-content-center my-4 mx-auto border-top">
                <p className="text-center text-light">
                  Copyright ©2024 All rights reserved | This website is designed
                  and built by <span>RMIT FTech Team</span>
                </p>
              </div>
            </footer>
          </div>
        </footer>
      </>
    );
}