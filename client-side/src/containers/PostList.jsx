import React, { useEffect } from "react";
import {
  fetchPosts,
  removePost,
  fetchCurrentUserPosts
} from "../store/actions/posts";
import {currentUserInfo} from "../store/actions/user";
import PostItem from "../components/PostItem";
import { connect } from "react-redux";
import DefaultProfileImg from "../images/default-profile-image.jpg";

function PostList(props) {
  useEffect(() => {
    console.log("Postlist component rendered");
    if (props.profile) {
      props.currentUserInfo(props.currentUser.id);
      props.fetchCurrentUserPosts(props.currentUser.id);
    } else {
      props.fetchPosts();
    }
  },[props.profile]);

  const { posts, removePost, currentUser, profile,otherUserInfo } = props;
  let postList = posts.map((m) => (
    <PostItem
      key={m._id}
      date={m.createAt}
      text={m.text}
      postMedia={m.postMediaUrl}
      username={m.user.username}
      profileImageUrl={m.user.profileImageUrl}
      removePost={removePost.bind(this, m.user._id, m._id)}
      isCorrectUser={currentUser === m.user._id}
    />
  ));
  
  return (
    <div className="row col-sm-8">
      {profile && (
        <div id="profile">
          <div className="img-div">
            <img src={`http://${otherUserInfo.profileImageUrl}`||DefaultProfileImg} alt="default Image" />
          </div>
          <div className="profile-details">
            <div className="edit-field">
              <h3>{otherUserInfo.displayName}</h3>
              <i className="fas fa-edit"></i>
            </div>

            <h6>@{otherUserInfo.username}</h6>
            <div className="edit-field">
            <p>
              {otherUserInfo.description}
            </p>
            <i className="fas fa-edit"></i>
            </div>

            <ul>
              <li>100 Followers</li>
              <li>{otherUserInfo.following && otherUserInfo.following.length} Following</li>
            </ul>
          </div>
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
    otherUserInfo:state.user.user
  };
}

export default connect(MapReduxStateToProps, {
  fetchPosts,
  removePost,
  fetchCurrentUserPosts,
  currentUserInfo
})(PostList);
