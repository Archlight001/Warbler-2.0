import { LOAD_POSTS, REMOVE_POST } from "../actionTypes";

export default function messages(state = {posts:[],reposters:[]}, action) {
  switch (action.type) {
    case LOAD_POSTS:
      return {...state,posts:action.posts[0],reposters:[action.posts[1]]};
    case REMOVE_POST:
      return {...state, posts:state.posts.filter((post) => post._id !== action.id)};
    default:
      return state;
  }
}
