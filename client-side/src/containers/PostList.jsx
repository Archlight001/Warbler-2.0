import React, { useEffect, useState } from "react";
import { fetchPosts, removePost } from "../store/actions/posts";
import { currentUserInfo } from "../store/actions/user";
import PostItem from "../components/PostItem";
import { connect } from "react-redux";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { addError, removeError } from "../store/actions/errors";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import { Link } from "react-router-dom";

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
    modifyProfileInfo,
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

  let [showEdit, toggleEdit] = useState({
    displayName: false,
    description: false,
  });

  let [displayName, setdisplayName] = useState("");
  let [description, setDescription] = useState("");

  let followStatus = isFollowing ? "unfollow" : "follow";

  const showModifyProfile = (value) => {
    setdisplayName(userInfo.displayName);
    setDescription(userInfo.description);

    value === "displayName"
      ? toggleEdit({ ...showEdit, displayName: !showEdit.displayName })
      : toggleEdit({ ...showEdit, description: !showEdit.description });
  };

  const modifyProfile = (value) => {
    if (value === "displayName") {
      if (displayName.trim() !== "") {
        modifyProfileInfo(currentUser.id, displayName, value);
        showModifyProfile("displayName");
      } else {
        alert("Empty fields are not allowed");
      }
    } else if (value === "description") {
      modifyProfileInfo(currentUser.id, description, value);
      showModifyProfile("description");
    }
  };

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
            {!showEdit.displayName ? (
              <div className="edit-field">
                <h3>{userInfo.displayName}</h3>
                {sameUser && (
                  <i
                    onClick={showModifyProfile.bind(this, "displayName")}
                    id="displayName"
                    className="fas fa-edit"
                  />
                )}
              </div>
            ) : (
              <div className="edit__displayName">
                <input
                  type="text"
                  name="displayName"
                  value={displayName}
                  onChange={(e) => setdisplayName(e.target.value)}
                />
                <div className="edit__icons">
                  <div>
                    <CheckIcon
                      onClick={modifyProfile.bind(this, "displayName")}
                    />
                  </div>
                  <div>
                    <CloseIcon
                      onClick={showModifyProfile.bind(this, "displayName")}
                    />
                  </div>
                </div>
              </div>
            )}

            <h6>@{userInfo.username}</h6>
            {!showEdit.description ? (
              <div className="edit-field">
                <p>{userInfo.description}</p>
                {sameUser && (
                  <i
                    onClick={showModifyProfile.bind(this, "description")}
                    className="fas fa-edit"
                  ></i>
                )}
              </div>
            ) : (
              <div className="edit__description">
                <textarea
                  name="description"
                  value={description}
                  rows="5"
                  cols="30"
                  maxLength="160"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="edit__icons">
                  <div>
                    <CheckIcon
                      onClick={modifyProfile.bind(this, "description")}
                    />
                  </div>
                  <div>
                    <CloseIcon
                      onClick={showModifyProfile.bind(this, "description")}
                    />
                  </div>
                </div>
              </div>
            )}

            <ul>
              <Link to={{pathname:`/profile/${userInfo.username}/followers`,state:{userInfo:userInfo,followOp:"followers"}}}>
                <li>{followers} Followers</li>
              </Link>
              <Link to={{pathname:`/profile/${userInfo.username}/following`,state:{userInfo:userInfo,followOp:"following"}}}>
                <li>
                  {userInfo?.following && userInfo?.following.length} Following
                </li>
              </Link>
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
