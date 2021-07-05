import React, { useState } from "react";
import "./Popup.css";
import Organization from "./Components/Organization";
import Stories from "./Components/Stories";

const Popup = () => {
  const [org, setOrg] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        <h1>MiddleGround</h1>
        <p>for Chrome</p>
      </header>
      <Organization org={org} />
      <Stories setOrg={setOrg} />
      <div className="more-container">
        <a
          href="https://middleground.netlify.app"
          target="_blank"
          rel="noreferrer"
          className="more"
        >
          VIEW MORE
        </a>
        <div className="underline"></div>
      </div>
    </div>
  );
};

export default Popup;
