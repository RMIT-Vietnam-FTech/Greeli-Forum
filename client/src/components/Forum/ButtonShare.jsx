import { useState } from "react";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";
import { FaShareFromSquare } from "react-icons/fa6";

export default function ButtonShare({ location }) {
  const [showShareList, setShowShareList] = useState(false);

  function handlePopup() {
    setShowShareList(!showShareList);
  }

  function handleClose() {
    setShowShareList(false);
  }

  return (
    <div className="share-btn position-relative">
      <button
        onClick={handlePopup}
        className="px-3 border border-primary-green bg-transparent text-forum-emphasis  align-items-center justify-content-center hover-style-green"
        style={{ fontSize: "14px", height: "25px", borderRadius:"20px"}}

      >
        <FaShareFromSquare className="mb-1" />
      </button>
      {showShareList && (
        <ShareList
          url={location}
          title="Check out this post!"
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export function ShareList({ url, title, onClose }) {
  return (
    <div
      className="share-list-container position-absolute rounded-3 p-2 bg-navbar-subtle shadow"
      style={{
        top: "1.8rem",
        right: "-7.5rem",
        zIndex: "2",
        width: "fit-content",
      }}
    >
      <button
        onClick={onClose}
        className="position-absolute top-0 text-greeli-emphasis start-1"
        style={{
          top: "0px",
          left: "0.5rem",
          background: "none",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
          color: "black",
        }}
      >
        &times;
      </button>
      <div className="icon-container  mt-3 d-flex gap-2 justify-content-center">
        <FacebookShareButton url={url} quote={title} hashtag="#Greeli">
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={url} title={title}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <RedditShareButton url={url} title={title}>
          <RedditIcon size={32} round />
        </RedditShareButton>
      </div>
    </div>
  );
}
