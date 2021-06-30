/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import STOPWORDS from "./../test.json";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { DateTime } from "luxon";

function Stories(props) {
  const [isLoading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);
  var fromDate = DateTime.now().toSQLDate();
  var toDate = fromDate;
  useEffect(async function () {
    makingRequest();

    async function makingRequest() {
      var tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      console.log(tabs, "is the tabs");
      chrome.tabs.sendMessage(
        tabs[0].id,
        { message: "send-h1" },
        function (response) {
          console.log(response, "is the received response.");
          if (response.h1) {
            makeRequest(response.h1);
            // setLoading(false);
          } else {
            setLoading(false);
            return [];
          }
        }
      );
    }

    async function makeRequest(response) {
      var query = filterResponse(response);
      console.log(query);
      try {
        var res = await fetch(
          `https://middleground-backend.herokuapp.com/searchTerm?query=${query}&view=${"center"}&datefrom=${fromDate}&dateto=${toDate}&order=${"popularity"}`
        );

        if (res.ok) {
          res = await res.json();
          console.log(res);
          setStories(res.articles.slice(0, 3));
        } else {
          console.log("No articles found!");
        }
        // setLoading(false);
      } catch (error) {
        console.log("CATCHING");
      } finally {
        setLoading(false);
      }
    }

    function filterResponse(response) {
      if (response === null) return;
      response = response.toLowerCase();
      response = response.split(" ");
      // console.log(response, "is the response but split");
      var returnValue = [];

      for (let word of response) {
        if (!STOPWORDS.words.includes(word)) {
          returnValue.push(word);
        }
      }

      return `${returnValue[0]} ${returnValue[1]}`;
    }
  }, []);

  return (
    <div className="stories">
      <div className="stories-header">
        <div className="line"></div>
        <h1>RELATED ARTICLES</h1>
        <div className="line"></div>
      </div>
      {isLoading === true ? (
        <div className="loader">
          <Loader
            type="MutatingDots"
            color="#BB9FD3"
            secondaryColor="#FFDB4A"
            height={100}
            width={100}
          />
        </div>
      ) : (
        <div className="container">
          {stories.length === 0 ? (
            <h1 className="nostories-placeholder">
              No related articles available
            </h1>
          ) : (
            stories.map(function (story) {
              return (
                <a
                  href={story.url}
                  target="_blank"
                  rel="noreferrer"
                  className="story-child"
                >
                  <img
                    src={story.urlToImage}
                    alt={story.title}
                    className="story-image"
                  />
                  <div class="story-information">{story.title}</div>
                </a>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default Stories;
