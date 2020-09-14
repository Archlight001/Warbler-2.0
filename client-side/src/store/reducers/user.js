import { SET_USER_INFO} from "../actionTypes";

const DEFAULT_STATE = {
  otherInfo: {} 
}
export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        otherInfo: action.user
      };

    default:
      return state;
  }
};
