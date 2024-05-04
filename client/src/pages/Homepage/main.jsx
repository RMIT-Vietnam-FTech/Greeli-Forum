import React from "react";
import NewsData from "./data/new";
import "../../scss/custom.css";
import "../../style/main.css";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoChatbubbles } from "react-icons/io5";
import { FaNewspaper } from "react-icons/fa";

export default function Main() {
  return (
    <>
      <main>
        {/* Short Description Content */}
        <div className="container my-5 mx-auto">
          <div className="text-center rounded-5 p-4">
            <h1 className="fw-bold pb-4">
              What is <span className="text-primary-green">Greeli</span>?
            </h1>
            <p className="col-lg-8 mx-auto fs-5 pb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              consectetur totam quibusdam animi nulla omnis deleniti aliquid!
              Veritatis distinctio voluptatem dicta quisquam sit voluptate odit,
              placeat illo, sunt unde nulla?
            </p>
            <div className="d-inline-flex pb-2">
              <button
                className="text-center text-white btn bg-primary-green-700 btn-lg px-5 py-3 rounded-pill fw-bold"
                type="button"
              >
                Read more
              </button>
            </div>
          </div>
        </div>

        {/* Solution Content */}
        <section
          className="pt-4 bg-primary-green border-bottom mx-5 rounded-5 "
          id="features"
        >
          <h1 className="fw-bold text-center text-primary-yellow pb-2 my-5">
            Our Solution
          </h1>
          <div className="container-fluid px-4 my-5 ">
            <div className="row gx-3 justify-content-between solution-container">
              <div className="col-md-3 col-12 mb-5 mb-lg-0 px-2 solution-item">
                <div className="feature d-inline-block center text-primary-yellow rounded-4 mb-3">
                  <HiMiniUserGroup size={40} />
                </div>
                <h5 className="fw-bolder text-primary-yellow mb-3">
                  Collaborative Forum
                </h5>
                <p className="text-white">
                  Paragraph of text beneath the heading to explain the heading.
                  We'll add onto it with another sentence and probably just keep
                  going until we run out of words.
                </p>
              </div>
              <div className="col-md-3 col-12 mb-5 mb-lg-0 px-2 mx-auto solution-item">
                <div className="feature d-inline-block center text-primary-yellow rounded-4 mb-3">
                  <IoChatbubbles size={40} />
                </div>
                <h5 className="fw-bolder text-primary-yellow mb-3">
                  Real-time Chatting
                </h5>
                <p className="text-white">
                  Paragraph of text beneath the heading to explain the heading.
                  We'll add onto it with another sentence and probably just keep
                  going until we run out of words.
                </p>
              </div>
              <div className="col-md-3 col-12 mb-5 mb-lg-0 px-2 solution-item">
                <div className="feature d-inline-block center text-primary-yellow rounded-4 mb-3">
                  <FaNewspaper size={40} />
                </div>
                <h5 className="fw-bolder text-primary-yellow mb-3">
                  Updating Informative Platform
                </h5>
                <p className="text-white">
                  Paragraph of text beneath the heading to explain the heading.
                  We'll add onto it with another sentence and probably just keep
                  going until we run out of words.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular News Content */}
        <div class="album py-5 bg-body-tertiary">
          <div class="container">
            <h1 className="text-body-emphasis">What is new?</h1>
            <div class="row row-cols-4 g-3">
              <div class="col">
                <div class="card shadow-sm">
                  <svg
                    class="bd-placeholder-img card-img-top"
                    width="100%"
                    height="225"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                  </svg>
                </div>
              </div>

              <div class="col">
                <div class="card shadow-sm">
                  <svg
                    class="bd-placeholder-img card-img-top"
                    width="100%"
                    height="225"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                  </svg>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <svg
                    class="bd-placeholder-img card-img-top"
                    width="100%"
                    height="225"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                  </svg>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <svg
                    class="bd-placeholder-img card-img-top"
                    width="100%"
                    height="225"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                  </svg>
                </div>
              </div>
              <div className="d-inline-flex pb-2">
                <button
                  className="text-center text-white btn bg-primary-green-700 btn-lg px-5 py-3 rounded-pill fw-bold"
                  type="button"
                >
                  Read more
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
