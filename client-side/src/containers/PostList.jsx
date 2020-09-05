import React, { useEffect } from "react";
import { fetchPosts, removePost,fetchCurrentUserPosts } from "../store/actions/posts";
import PostItem from "../components/PostItem";
import { connect } from "react-redux";

function PostList(props) {
  useEffect(() => {
    if(props.profile){
      props.fetchCurrentUserPosts(props.currentUser);
    }else{
      props.fetchPosts();
    }    
  });

  const { posts, removePost, currentUser,profile } = props;
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
      {profile && <div className="offset-1 col-sm-10">
        <h1>HEYYYY</h1>
      </div>}
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

export default connect(MapReduxStateToProps, { fetchPosts, removePost,fetchCurrentUserPosts })(
  PostList
);
