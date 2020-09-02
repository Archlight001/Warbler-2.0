import { LOAD_POSTS, REMOVE_POST } from "../actionTypes";

export default function messages(state = [], action) {
  switch (action.type) {
    case LOAD_POSTS:
      return [...action.posts];
    case REMOVE_POST:
      return state.filter((post) => post._id !== action.id);
    default:
      return state;
  }
}
