import React from "react";

function Story({ story }) {
  return (
    <a
      href={story.url}
      target="_blank"
      rel="noreferrer"
      className="story-child"
    >
      <img src={story.urlToImage} alt={story.title} className="story-image" />
      <div className="information">
        <div class="story-information">{story.title}</div>
        <img src={story.biasImage} alt="bias depictor" />
      </div>
    </a>
  );
}

export default Story;
