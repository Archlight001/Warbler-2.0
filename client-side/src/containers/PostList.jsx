import React, { useEffect } from "react";
import {
  fetchPosts,
  removePost,
  fetchCurrentUserPosts,
} from "../store/actions/posts";
import PostItem from "../components/PostItem";
import { connect } from "react-redux";
import DefaultProfileImg from "../images/default-profile-image.jpg";

function PostList(props) {
  useEffect(() => {
    if (props.profile) {
      props.fetchCurrentUserPosts(props.currentUser);
    } else {
      props.fetchPosts();
    }
  });

  const { posts, removePost, currentUser, profile } = props;
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
            <img src={DefaultProfileImg} alt="default Image" />
          </div>
          <div className="profile-details">
            <div className="edit-field">
              <h3>Display Name</h3>
              <i class="fas fa-edit"></i>
            </div>

            <h6>@username</h6>
            <div className="edit-field">
            <p>
              Short description about certain individual that registered on the
              app
            </p>
            <i class="fas fa-edit"></i>
            </div>

            <ul>
              <li>100 Followers</li>
              <li>100 Following</li>
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
    currentUser: state.currentUser.user.id,
  };
}

export default connect(MapReduxStateToProps, {
  fetchPosts,
  removePost,
  fetchCurrentUserPosts,
})(PostList);
