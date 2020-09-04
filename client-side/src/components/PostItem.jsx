import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import PostMedia from "./PostMedia";
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
  let media = [];
  if (postMedia.length === 1) {
    media =  <PostMedia key={1} postMedia={postMedia[0]} stretch />
  } else {
    media = postMedia.map((value, index) => {
      return <PostMedia key={index} postMedia={value} />;
    });
  }
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

          {postMedia.length !== 0 && <div className="mediaDiv">{media}</div>}

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
