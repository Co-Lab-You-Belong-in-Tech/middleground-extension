import React, { useEffect, useState } from "react";
import "./Popup.css";
import Organization from "./Components/Organization";
import Stories from "./Components/Stories";
import NotSupported from "./Components/Notsupported";
import { matchOrganization } from "./utils/parseUrl";

function Popup() {
  const [org, setOrg] = useState(null);
  const [h1, setH1] = useState(null);

  useEffect(function () {
    fetchH1();

    async function fetchH1() {
      var tabs = await chrome.tabs.query({ currentWindow: true, active: true });
      var organizationUrl = tabs[0].url;
      var organization = matchOrganization(organizationUrl);
      setOrg(organization);

      // Getting H1 from the webpage
      chrome.tabs.sendMessage(
        tabs[0].id,
        { message: "send-h1" },
        function (response) {
          console.log(response, "is the response from the tab.");
          if (response !== undefined && response.message === "sending-h1") {
            setH1(response.h1);
          } else {
            // setLoading(false);
            // return [];
          }
        }
      );
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>MiddleGround</h1>
        <p>for Chrome</p>
      </header>
      {org === "not found" ? (
        <NotSupported />
      ) : (
        <div>
          <Organization org={org} />
          <Stories h1={h1} />
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
      )}
    </div>
  );
}

export default Popup;
