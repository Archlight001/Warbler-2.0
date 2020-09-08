import {combineReducers} from "redux";
import errors from "./errors";
import currentUser from "./currentUser";
import user from "./user";
import posts from "./posts";

const rootReducer = combineReducers({errors,currentUser,posts,user});

export default rootReducer;