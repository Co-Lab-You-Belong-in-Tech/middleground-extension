import React from "react";

function NotSupported(props) {
  return (
    <div className="not-supported-container">
      <img src="./resources/notfound.png" alt="This site is not supported" />
      <h1>LOOKS LIKE WE HAVEN'T ASSESSED THIS SOURCE YET</h1>
      <a
        href="https://middleground.netlify.app"
        target="_blank"
        rel="noreferrer"
      >
        CLICK HERE TO FIND MORE ARTICLES
      </a>
    </div>
  );
}

export default NotSupported;
