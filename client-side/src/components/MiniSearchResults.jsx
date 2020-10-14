import React, { useState } from "react";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { followOperation } from "../store/actions/user";

function MiniSearchResults({
  id,
  displayName,
  username,
  profileImageUrl,
  showFollowButton,
  currentUser,
  followOperation,
}) {
  let [following, setFollowing] = useState(false);

  function handleFollow(id, username, e) {
    e.preventDefault();
    let followStatus = following ? "unfollow" : "follow";
    followOperation(id, username, followStatus);
    setFollowing(!following);
  }

  return (
    <Link to={{ pathname: `/profile/${username}`, state: { userId: id } }}>
      <div className="general__mini__profile">
        <div className="user__profile__mini">
          <div className="img__div__mini">
            <img
              src={`http://${profileImageUrl}` || DefaultProfileImg}
              alt="username"
            />
          </div>
          <div className="otherInfo__div__mini">
            <h6>{displayName}</h6>
            <span>@{username}</span>
          </div>
        </div>
        {showFollowButton && (
          <div className="follow__btn__mini">
            <button
              onClick={handleFollow.bind(this, currentUser.id, username)}
              className="btn btn-info"
            >
              {following ? "Following" : "Follow"}
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}

function MapReduxStateToProps(state) {
  return {
    currentUser: state.currentUser.user,
    error: state.errors.message,
  };
}

export default connect(MapReduxStateToProps, {
  followOperation,
})(MiniSearchResults);
