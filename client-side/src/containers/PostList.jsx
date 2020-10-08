import React, { useEffect, useState } from "react";
import {
  fetchPosts,
  removePost,
  like__unlikePosts,
  repost__op,
} from "../store/actions/posts";
import { currentUserInfo } from "../store/actions/user";
import PostItem from "../components/PostItem";
import { connect } from "react-redux";
import { addError, removeError } from "../store/actions/errors";
import UserProfile from "../components/UserProfile";

function PostList(props) {
  useEffect(() => {
    if (!props.profile) {
      props.fetchPosts(props.currentUser.id);
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
    like__unlikePosts,
    repost__op,
  } = props;

  let postList = posts.posts.map((m, index) => (
    <PostItem
      key={index}
      postId={m._id}
      id={m.user._id}
      date={m.createAt}
      text={m.text}
      repostedByList={posts.reposters}
      currentUsername={currentUser.username}
      postMedia={m.postMediaUrl}
      username={m.user.username}
      repostList={m.repostedBy}
      likeList={m.likedBy}
      isLiked={m.likedBy.find((user) => currentUser.username === user)}
      isReposted={m.repostedBy.find((user) => currentUser.username === user)}
      profileImageUrl={m.user.profileImageUrl}
      noOfLikes={m.likedBy.length}
      noOfReposts={m.repostedBy.length}
      like__unlikePosts={like__unlikePosts}
      repost__op={repost__op}
      removePost={removePost.bind(this, m.user._id, m._id)}
      isCorrectUser={currentUser.id === m.user._id}
    />
  ));

  return (
    <div className="row col-sm-8">
      <div className="offset-1 col-sm-10">
        <ul className="list-group" id="posts">
          {profile && (
            <UserProfile
              profileImageUrl={userInfo.profileImageUrl}
              followers={followers}
              userInfo={userInfo}
              modifyProfileInfo={modifyProfileInfo}
              isFollowing={isFollowing}
              sameUser={sameUser}
              followOperation={followOperation}
              currentUser={currentUser}
            />
          )}
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
  like__unlikePosts,
  repost__op,
})(PostList);
