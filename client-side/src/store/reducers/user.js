import { SET_USER_INFO} from "../actionTypes";

const DEFAULT_STATE = {
  user: {} 
}
export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        user: action.user
      };

    default:
      return state;
  }
};
