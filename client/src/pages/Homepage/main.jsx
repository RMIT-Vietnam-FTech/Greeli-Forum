import React from "react";

export default function Main() {
  return (
    <>
      <main>
        <div className="container my-5 ">
          <div className="p-5 text-center rounded-5 ">
            <h1 className="text-body-emphasis">
              What is <span>Greeli</span>?
            </h1>
            <p className="col-lg-8 mx-auto fs-5 text-muted">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              consectetur totam quibusdam animi nulla omnis deleniti aliquid!
              Veritatis distinctio voluptatem dicta quisquam sit voluptate odit,
              placeat illo, sunt unde nulla?
            </p>
            <div className="d-inline-flex mb-5">
              <button
                className="d-inline-flex align-items-center text-white btn bg-green-700 btn-lg px-5 py-3 rounded-pill"
                type="button"
              >
                Call to action
              </button>
            </div>
          </div>
        </div>

        <div className="container-fluid py-5 my-5 mx-4  rounded-5 bg-primary-green-700">
          <h2 className="fs-1 text-center text-yellow-500">Our Solution</h2>
          <div className="row px-3 justify-content-between">
            <div className="col-3 mb-3 mx-0">
              <div className="feature-icon fs-2 mb-3"></div>
              <h3 className="fs-3 text-primary-yellow">Collaborative Forum</h3>
              <p className="text-white">
                Paragraph of text beneath the heading to explain the heading.
                We'll add onto it with another sentence and probably just keep
                going until we run out of words.
              </p>
            </div>
            <div className="col-3 mb-3 mx-0">
              <div className="feature-icon fs-2 mb-3"></div>
              <h3 className="fs-3 text-primary-yellow">Real-time Chatting</h3>
              <p className="text-white">
                Paragraph of text beneath the heading to explain the heading.
                We'll add onto it with another sentence and probably just keep
                going until we run out of words.
              </p>
            </div>
            <div className="col-3 mb-3 mx-0">
              <div className="feature-icon fs-2 mb-3"></div>
              <h3 className="fs-3 text-yellow-500">
                Updating Informative Platform
              </h3>
              <p className="text-white">
                Paragraph of text beneath the heading to explain the heading.
                We'll add onto it with another sentence and probably just keep
                going until we run out of words.
              </p>
            </div>
          </div>
        </div>

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
                    <rect width="100%" height="100%" fill="#55595c"></rect>
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
                    <rect width="100%" height="100%" fill="#55595c"></rect>
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
                    <rect width="100%" height="100%" fill="#55595c"></rect>
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
                    <rect width="100%" height="100%" fill="#55595c"></rect>
                  </svg>
                </div>
              </div>
              <div className="d-flex justify-content-center mx-auto pt-5 my-3">
                <button
                  className="d-inline-flex align-items-center text-white btn bg-green-700 btn-lg px-5 py-3 rounded-pill"
                  type="button"
                >
                  Call to action
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
