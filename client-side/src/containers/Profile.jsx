import React, { useEffect, useState } from "react";
import UserAside from "../components/UserAside";
import PostList from "./PostList";
import { fetchCurrentUserPosts } from "../store/actions/posts";
import { currentUserInfo } from "../store/actions/user";
import { connect } from "react-redux";
import { apiCall } from "../services/api";

function Profile({
  username,
  profileImageUrl,
  currentUserInfo,
  fetchCurrentUserPosts,
  currentUser,
  userInfo,
  location,
  otherUser,
}) {
  useEffect(() => {
    if (otherUser) {
      currentUserInfo(location.state?.userId);
      fetchCurrentUserPosts(location.state?.userId);
    } else {
      currentUserInfo(currentUser.id);
      fetchCurrentUserPosts(location.state?.userId || currentUser.id);
    }
  }, []);

  let [followers, getFollowers] = useState(0);

  function followersLength() {
    apiCall("post", `/api/userops/${userInfo.id}/followers`, {
      username: userInfo.username,
    })
      .then((result) => {
        getFollowers(result.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  followersLength();
  return (
    <div className="row">
      <UserAside username={username} profileImageUrl={profileImageUrl} />
      <PostList profile userInfo={userInfo} followers={followers} />
    </div>
  );
}

function MapReduxStateToProps(state) {
  return {
    currentUser: state.currentUser.user,
    userInfo: state.user.otherInfo,
    error: state.errors.message,
  };
}

export default connect(MapReduxStateToProps, {
  currentUserInfo,
  fetchCurrentUserPosts,
})(Profile);
