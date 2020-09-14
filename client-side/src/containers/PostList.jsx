import React, { useEffect, useState } from "react";
import { fetchPosts, removePost } from "../store/actions/posts";
import { currentUserInfo } from "../store/actions/user";
import PostItem from "../components/PostItem";
import { connect } from "react-redux";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { addError, removeError } from "../store/actions/errors";

function PostList(props) {
  useEffect(() => {
    if (!props.profile) {
      props.fetchPosts();
    }
  }, [props.profile]);

  const {
    posts,
    removePost,
    currentUser,
    profile,
    userInfo,
    followers,
    sameUser,
    followOperation,
    isFollowing,
  } = props;

  let postList = posts.map((m) => (
    <PostItem
      key={m._id}
      id={m.user._id}
      date={m.createAt}
      text={m.text}
      postMedia={m.postMediaUrl}
      username={m.user.username}
      profileImageUrl={m.user.profileImageUrl}
      removePost={removePost.bind(this, m.user._id, m._id)}
      isCorrectUser={currentUser.id === m.user._id}
    />
  ));

  let followStatus = isFollowing ? "unfollow" : "follow";

  return (
    <div className="row col-sm-8">
      {profile && (
        <div id="profile">
          <div className="img-div">
            <img
              src={`http://${userInfo.profileImageUrl}` || DefaultProfileImg}
              alt="default Image"
            />
          </div>
          <div className="profile-details">
            <div className="edit-field">
              <h3>{userInfo.displayName}</h3>
              <i className="fas fa-edit"></i>
            </div>

            <h6>@{userInfo.username}</h6>
            <div className="edit-field">
              <p>{userInfo.description}</p>
              <i className="fas fa-edit"></i>
            </div>

            <ul>
              <li>{followers} Followers</li>
              <li>
                {userInfo?.following && userInfo?.following.length} Following
              </li>
            </ul>
          </div>

          {!sameUser && (
            <div className="follow__btn">
              <button
                onClick={followOperation.bind(
                  this,
                  currentUser.id,
                  userInfo.username,
                  followStatus
                )}
                className="btn btn-info"
              >
                {followStatus === "follow" ? "Follow" : "Following"}
              </button>
            </div>
          )}
        </div>
      )}
      <div className="offset-1 col-sm-10">
        <ul className="list-group" id="posts">
          {postList}
        </ul>
      </div>
    </div>
  );
}

function MapReduxStateToProps(state) {
  return {
    posts: state.posts,
    currentUser: state.currentUser.user,
    error: state.errors.message,
  };
}

export default connect(MapReduxStateToProps, {
  fetchPosts,
  removePost,
  currentUserInfo,
  addError,
  removeError,
})(PostList);
