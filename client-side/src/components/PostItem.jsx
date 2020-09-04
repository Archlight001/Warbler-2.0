import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";

export default function MessageItem({
  date,
  profileImageUrl,
  text,
  postMedia,
  username,
  removePost,
  isCorrectUser,
}) {
  return (
    <div>
      <li className="list-group-item">
        <img
          src={`http://${profileImageUrl}` || DefaultProfileImg}
          alt={username}
          height="100"
          width="100"
          className="timeline-image"
        />
        <div className="message-area">
          <Link to="/">@{username} &nbsp;</Link>
          <span className="text-muted">
            <Moment className="text-muted" format="Do MM YYYY">
              {date}
            </Moment>
          </span>
          <p>{text}</p>

          {postMedia.length !== 0 && (
            <div className="mediaDiv">
              <img src={`http://${postMedia[0]}`} alt="" />{" "}
            </div>
          ) }

          {console.log(postMedia)}

          {isCorrectUser && (
            <a className="btn btn-danger" onClick={removePost}>
              Delete
            </a>
          )}
        </div>
      </li>
    </div>
  );
}
