import React, { useState } from "react";
import "../css/User.css";
import DefaultProfileImg from "../images/default-profile-image.jpg";

function User({
  displayName,
  username,
  profileImage,
  isFollowing,
  followOperation,
  id,
  currentUser__username,
}) {
  let [following, setFollowing] = useState(isFollowing);
  function handleFollow(id, username) {
    let followStatus = following ? "unfollow" : "follow";
    followOperation(id, username, followStatus);
    setFollowing(!following);
  }
  return (
    <div className="main__userContainer">
      <div className="user__profile">
        <div className="img__div">
          <img
            src={`data:${profileImage[0].contentType};base64,${profileImage[0].data}` || DefaultProfileImg}
            alt={username}
          />
        </div>
        <div className="otherInfo__div">
          <h4>{displayName}</h4>
          <p>@{username}</p>
        </div>
      </div>

      <div>
        {username !== currentUser__username && (
          <button
            onClick={handleFollow.bind(this, id, username)}
            className="btn btn-info"
          >
            {following ? "Following" : "Follow"}
          </button>
        )}
      </div>
    </div>
  );
}

export default User;
