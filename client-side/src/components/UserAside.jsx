import React from "react";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import "../css/UserAside.css";

export default function UserAside({ profileImageUrl, username }) {
  return (
    <aside className="col-sm-2">
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="img-div">
            <img
              src={`http://${profileImageUrl}` || DefaultProfileImg}
              alt={username}
              target="_blank"
              className="img-fluid"
            />
          </div>

          <h4>{username}</h4>
        </div>
      </div>
    </aside>
  );
}
