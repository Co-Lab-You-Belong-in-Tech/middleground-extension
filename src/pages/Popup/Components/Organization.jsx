import React from "react";

function Organization({ org }) {
  return (
    <div>
      {org == null ? (
        <h1>Loading</h1>
      ) : (
        <div className="organizations">
          <img src={org.logo} alt={org.name} />
          <div className="details">
            <h5>THIS NEWS ORGANIZATION HAS A</h5>
            <h3>{org.bias.toUpperCase()} BIAS</h3>
            <p>BY AD FONTES MEDIA</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Organization;
