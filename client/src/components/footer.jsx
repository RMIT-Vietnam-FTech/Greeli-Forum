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
      <footer className="container-fluid bg-primary-green-700 pt-5">
        <div className="row row-cols-lg-3 row-cols-md-1 justify-content-around mx-lg-3" id="footer-content">
          {/* Who are we Section */}
          <div className="col-lg-3 col-md-3 footer-section" id="intro">
            <h3 className="fw-bold text-light">Who are we</h3>
            <p className="text-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus itaque earum, laudantium fugiat officiis odit ullam
              aut delectus ea magnam.
            </p>
            <img
              src="logo.svg"
              alt="greeli logo"
              width={100}
              className="pt-5"
              id="weblogo"
            />
          </div>

          {/* Important Link Section*/}
          <div className="col-lg-3 col-md-3 footer-section">
            <h3 className="fw-bold text-light">Important Link</h3>
            <ul className="nav flex-column">
              <li className="mb-2">
                <a href="#" className="nav-link d-inline p-0 text-light">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="nav-link d-inline p-0 text-light">
                  General
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="nav-link d-inline p-0 text-light">
                  Forum
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="nav-link d-inline p-0 text-light">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="nav-link d-inline p-0 text-light">
                  Contact
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="nav-link d-inline p-0 text-light">
                  Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info Section*/}
          <div className="col-lg-3 col-md-3 footer-section" id="contact-info">
            <h3 className="fw-bold text-light">Contact Info</h3>
            <ul className="nav flex-column" id="contact-list">
              <li className="nav-item mb-2">
                <a
                  href="#"
                  className="nav-link d-inline-flex align-items-center gap-2 p-0 text-light"
                >
                  <GrMail size={20} />
                  <span className="contact">business@greeli@gmail.com.vn</span>
                </a>
              </li>
              <li className="nav-item mb-2">
                <a
                  href="#"
                  className="nav-link d-inline-flex align-items-center gap-2 p-0 text-light"
                >
                  <FaFacebook size={20} />
                  <span className="contact">business@greeli@gmail.com.vn</span>
                </a>
              </li>
              <li className="nav-item mb-2">
                <a
                  href="#"
                  className="nav-link d-inline-flex align-items-center gap-2 p-0 text-light"
                >
                  <AiFillInstagram size={20} />
                  <span className="contact">business@greeli@gmail.com.vn</span>
                </a>
              </li>
              <li className="nav-item mb-2">
                <a
                  href="#"
                  className="nav-link d-inline-flex align-items-center gap-2 p-0 text-light"
                >
                  <AiOutlineTikTok size={20} />
                  <span className="contact">business@greeli@gmail.com.vn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* copyright of Greeli */}
        <div
          className="mx-lg-4 mt-5"
          id="copyright"
        >
          <div class="text-light text-center py-3 px-4">
            Copyright ©2024 All rights reserved | This website is designed and
            built by <span class="text-primary-yellow">RMIT FTech Team</span>
          </div>
        </div>
      </footer>
    </>
  );
}
