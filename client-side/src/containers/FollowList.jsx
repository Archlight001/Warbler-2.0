import React, { useEffect, useState } from "react";
import "../css/FollowList.css";
import User from "../components/User";
import { apiCall } from "../services/api";
import { connect } from "react-redux";
import { followOperation } from "../store/actions/user";
import UserAside from "../components/UserAside";

function FollowList({ userInfo, followOp, followOperation, currentUser,sidebar,showSidebar,username,profileImage }) {
  useEffect(() => {
    apiCall("post", `/api/userops/${userInfo.id}/${followOp}`, {
      username: userInfo.username,
      id: userInfo.id,
    })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let [data, setData] = useState({});

  console.log(data);

  let Users = [];

  if (data.length !== undefined) {
    Users = data?.map((data, index) => (
      <User
        key={index}
        id={currentUser.id}
        currentUser__username={currentUser.username}
        displayName={data.displayName}
        isFollowing={
          userInfo.currentUserFollowing.find(
            (value) => value === data.username
          ) !== undefined
            ? true
            : false
        }
        username={data.username}
        followOperation={followOperation}
        profileImage={data.profileImage}
      />
    ));
  }
  return (
    <div className="general__container">
      {sidebar && (
        <div className="side__bar">
          <UserAside
            username={username}
            profileImage={profileImage}
            showSidebar={showSidebar}
          />
        </div>
      )}
      <div className="main__followContainer row col-sm-8">{Users}</div>
    </div>
  );
}

function MapReduxStateToProps(state) {
  return {
    currentUser: state.currentUser.user,
    error: state.errors.message,
  };
}

export default connect(MapReduxStateToProps, {
  followOperation,
})(FollowList);
