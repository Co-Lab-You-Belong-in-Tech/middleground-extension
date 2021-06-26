import React from 'react';
import './Popup.css';
import Organization from "./Components/Organization";
import Stories from "./Components/Stories";

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MiddleGround</h1>
        <p>for Chrome</p>
      </header>
      <Organization />
      <Stories />
      <a href="http://localhost:3000/" target="_blank" rel="noreferrer" className="more">
        VIEW MORE
      </a>
      <div className="underline"></div>
    </div>

  );
};

export default Popup;
