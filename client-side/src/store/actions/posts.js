import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { ADD_POST, LOAD_POSTS, REMOVE_POST } from "../actionTypes";

export const loadPosts = (posts) => ({
  type: LOAD_POSTS,
  posts,
});

export const remove = (id) => ({
  type: REMOVE_POST,
  id,
});

export const addPost = (post) =>({
  type:ADD_POST,
  post
})

export const removePost = (user_id, post_id) => {
  return (dispatch) => {
    return apiCall("delete", `/api/users/${user_id}/posts/${post_id}`)
      .then(() => dispatch(remove(post_id)))
      .catch((err) => dispatch(addError(err.message)));
  };
};

export const fetchPosts = (id) => {
  return (dispatch) => {
    return apiCall("post", "/api/posts", { id: id })
      .then((res) => {
        dispatch(loadPosts(res));
      })
      .catch((err) => dispatch(addError(err.message)));
  };
};

export const fetchCurrentUserPosts = (user_id,currentUserId) => {
  return (dispatch) => {
    return apiCall("post", `/api/users/${currentUserId}/posts/otheruserposts`,{id:user_id})
      .then((res) => {
        dispatch(loadPosts(res));
      })
      .catch((err) => dispatch(addError(err.message)));
  };
};

export const sendNewPost = (data) => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/posts`, data)
    .then((post) => dispatch(addPost(post)))
    .catch((err) => dispatch(addError(err.message)));
};

export const like__unlikePosts = (postId, user, id, op) => {
  return (dispatch) => {
    return apiCall("post", `/api/users/${id}/posts/like_unlike/${op}`, {
      postId,
      user,
    })
      .then((posts) => {
        dispatch(loadPosts(posts));
      })
      .catch((err) => dispatch(addError(err.message)));
  };
};

export const repost__op = (postId, user, id, op) => {
  return (dispatch) => {
    return apiCall("post", `/api/users/${id}/posts/repost_op/${op}`, {
      postId,
      user,
    })
      .then((posts) => {
        dispatch(loadPosts(posts));
      })
      .catch((err) => dispatch(addError(err.message)));
  };
};


