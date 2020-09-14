import React from "react";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import "../css/UserAside.css";
import { Link } from "react-router-dom";

export default function UserAside({ profileImageUrl, username, show }) {
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
          <div className="navigation">
            <Link to="/">
              <button className="btn btn-success">Home</button>
            </Link>
            <Link to="/profile">
              <button className="btn btn-success">Profile</button>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
