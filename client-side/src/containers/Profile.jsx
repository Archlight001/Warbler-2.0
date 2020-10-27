import React, { useEffect, useState } from "react";
import UserAside from "../components/UserAside";
import PostList from "./PostList";
import { fetchCurrentUserPosts } from "../store/actions/posts";
import { currentUserInfo, followOperation,modifyProfile } from "../store/actions/user";
import { connect } from "react-redux";
import { apiCall } from "../services/api";
import "../css/PostList.css";
import Search from "./Search";

function Profile({
  username,
  profileImage,
  currentUserInfo,
  fetchCurrentUserPosts,
  currentUser,
  userInfo,
  location,
  otherUser,
  followOperation,
  modifyProfile,sidebar,showSidebar
}) {
  useEffect(() => {
    if (otherUser) {
      currentUserInfo(location.state?.userId,currentUser.id);
      fetchCurrentUserPosts(location.state?.userId,currentUser.id);
    } else {
      currentUserInfo(currentUser.id,currentUser.id);
      fetchCurrentUserPosts(location.state?.userId || currentUser.id,currentUser.id);
    }
  }, []);

  let [followers, getFollowers] = useState(0);
  let [isFollowing, setFollowing] = useState(false);

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

  function checkFollowing() {
    apiCall("post", `/api/userops/${currentUser.id}/followOp/checkFollowing`, {
      username: userInfo.username,
      id: currentUser.id,
    })
      .then((result) => {
        setFollowing(result.following);
      })
      .catch((err) => console.log(err));
  }

  followersLength();

  if (currentUser.id !== userInfo.id) {
    checkFollowing();
  }

  return (
    <div className="general__container">
       {window.screen.width > 600 ? (
        <UserAside username={username} profileImage={profileImage} />
      ) : (
        sidebar && (
          <div className="side__bar">
            <UserAside username={username} profileImage={profileImage} showSidebar={showSidebar} />
          </div>
        )
      )}
      <PostList
        profile
        userInfo={userInfo}
        isFollowing={isFollowing}
        modifyProfileInfo = {modifyProfile}
        sameUser={currentUser.id !== userInfo.id ? false : true}
        followOperation={followOperation}
        followers={followers}
      />
      {window.screen.width>600 && <Search />}
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
  followOperation,
  modifyProfile
})(Profile);
