import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { DateTime } from "luxon";
import STOPWORDS from "../datasets/stop_words.json";
import filterH1RemoveStopWords from "../utils/filterStopWords";
import assignBias from "../utils/assignOrgBias";
import Story from "./Story";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Stories({ h1 }) {
  const [isLoading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);
  var fromDate = DateTime.now().toSQLDate();
  var toDate = fromDate;
  useEffect(
    function makesRequest() {
      if (h1 === null) return;
      makeRequest(h1);

      async function makeRequest(h1) {
        var query = filterH1RemoveStopWords(h1, STOPWORDS);
        try {
          var res = await fetch(
            `https://middleground-backend.herokuapp.com/searchTerm?query=${query}&view=all&datefrom=${fromDate}&dateto=${toDate}&order=${"popularity"}`
          );

          if (res.ok) {
            res = await res.json();
            var newArticles = res.articles.slice(0, 3);

            // assigning organizational bias
            newArticles = assignBias(newArticles);

            // set articles state to update them on page
            setStories(newArticles);
          } else {
            // no articles found
            setStories([]);
          }
        } catch (error) {
          // logging the error
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    },
    [h1, fromDate, toDate]
  );

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
              return <Story story={story} />;
            })
          )}
        </div>
      )}
    </div>
  );
}

export default Stories;
