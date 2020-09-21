import React from "react";
import DefaultProfileImg from "../images/default-profile-image.jpg";

function MiniSearchResults({displayName,username,profileImageUrl}) {
  return (
    <div className="user__profile__mini">
      <div className="img__div__mini">
        <img
          src={`http://${profileImageUrl}`||DefaultProfileImg}
          alt="username"
        />
      </div>
      <div className="otherInfo__div">
        <h6>{displayName}</h6>
        <span>@{username}</span>
      </div>
    </div>
  );
}

export default MiniSearchResults;
