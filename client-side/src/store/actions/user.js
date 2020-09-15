import { apiCall } from "../../services/api";
import { SET_USER_INFO } from "../actionTypes";
import { addError, removeError } from "./errors";

export function setUserInfo(user) {
  return {
    type: SET_USER_INFO,
    user,
  };
}

export function currentUserInfo(id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/userops/${id}`, { id: id })
        .then((info) => {
          dispatch(setUserInfo(info));
          dispatch(removeError());
          resolve();
        })
        .catch((err) => {
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}

export function followOperation(id, username, op) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/userops/${id}/followOp/${op}`, {
        username: username,
        id: id,
      })
        .then((info) => {
          dispatch(setUserInfo(info));
          dispatch(removeError());
          resolve();
        })
        .catch((err) => {
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}

export function modifyProfile(id, value, profile) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/userops/${id}/modifyProfile/${profile}`, {
        id: id,
        value: value,
      })
        .then((info) => {
          dispatch(setUserInfo(info));
          dispatch(removeError());
          resolve();
        })
        .catch((err) => {
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}
