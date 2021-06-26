/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import STOPWORDS from "./../test.json";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';


// const articles = [
//   {
//     urlToImage: "https://placedog.net/500",
//     title: "lorem ipsum dolor set semat",
//     id: 1,
//   },
//   {
//     urlToImage: "https://placedog.net/500",
//     title: "lorem ipsum dolor set semat",
//     id: 2,
//   },
//   {
//     urlToImage: "https://placedog.net/500",
//     title: "lorem ipsum dolor set semat",
//     id: 3,
//   },
// ];
function Stories(props) {
    // const [loading, setLoading] = useState(true);
    const [stories, setStories] = useState([]);
    useEffect(async function () {

        makingRequest();

        async function makingRequest() {
            var tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            console.log(tabs, "is the tabs");
            chrome.tabs.sendMessage(
                tabs[0].id,
                {message: "send-h1",},
                function (response) {
                    console.log(response, "is the received response.");
                    if (response.h1) {
                        makeRequest(response.h1);
                        // setLoading(false);
                    } else {
                        // setLoading(false);
                        return [];
                    }
                }
            );
        }


        async function makeRequest(response) {
            var query = filterResponse(response);
            try {
                var res = await fetch(
                    `http://localhost:3500/searchTerm?query=${query}&view=${"left"}&datefrom=${"2021-06-26"}&dateto=${"2021-06-26"}`
                );

                if (res.ok) {
                    res = await res.json();
                    console.log(res);
                    setStories(res.articles.slice(0, 3));
                } else {
                console.log("No articles found!");
                }
            } catch (error) {
                console.log("CATCHING");
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

            return returnValue[0];
        }
    }, []);



  return (
    <div className="stories">
      <div className="stories-header">
        <div className="line"></div>
        <h1>RELATED ARTICLES</h1>
        <div className="line"></div>
          </div>
              <div className="container">
                  {stories.length === 0 ? (
                      <h1 className="nostories-placeholder">
                          No related articles available
                      </h1>
                  ) : (
                      stories.map(function (story) {
                          return (
                              <a href={story.url} target="_blank" rel="noreferrer" className="story-child">
                                  <img src={story.urlToImage} alt={story.title} className="story-image" />
                                  <div class="story-information">{story.title}</div>
                              </a>
                          );
                      })
                  )}
              </div>
          
    </div>
  );
}

export default Stories;
