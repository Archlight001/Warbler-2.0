import React from "react";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import "../css/UserAside.css";
import { Link } from "react-router-dom";

export default function UserAside({ profileImage, username, showSidebar }) {
  
  let image ="";

  if(profileImage !== undefined){
    image = `data:${profileImage[0].contentType};base64,${profileImage[0].data}`
  }
  return (
    <aside className="col-sm-2">
      <div className="panel panel__default">
        <div className="panel__body">
          <div className="useraside__img__div">
            <img
              src={ image || DefaultProfileImg}
              alt={username}
              target="_blank"
              className="img-fluid"
            />
          </div>

            <h4>{username}</h4>
          <div className="useraside__navigation">
            <Link to="/">
              <button className="btn" onClick={showSidebar}>Home</button>
            </Link>
            <Link to="/profile" >
              <button className="btn" onClick={showSidebar}>Profile</button>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
