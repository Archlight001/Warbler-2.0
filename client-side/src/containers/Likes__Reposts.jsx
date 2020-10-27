import React, { useState, useEffect } from "react";
import { apiCall } from "../services/api";
import { connect } from "react-redux";
import { currentUserInfo } from "../store/actions/user";
import "../css/Likes__Reposts.css";
import { followOperation } from "../store/actions/user";
import User from "../components/User";
import UserAside from "../components/UserAside";

const Likes__Reposts = ({
  list,
  op,
  id,
  currentUser,
  followOperation,
  userInfo,
  currentUserInfo,
  sidebar,
  showSidebar,
  profileImage,
  username,
}) => {
  useEffect(() => {
    currentUserInfo(currentUser.id, currentUser.id);
    apiCall("post", `/api/users/${id}/posts/list`, { list, op })
      .then((list) => {
        setList(list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let [dbList, setList] = useState([]);

  console.log(dbList);

  let Users = [];
  if (dbList.length !== undefined) {
    Users = dbList?.map((data, index) => (
      <User
        key={index}
        id={currentUser.id}
        currentUser__username={currentUser.username}
        displayName={data.displayName}
        isFollowing={
          userInfo.currentUserFollowing?.find(
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
      <div className="main__container row col-sm-8">{Users}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser.user,
  userInfo: state.user.otherInfo,
});

export default connect(mapStateToProps, { followOperation, currentUserInfo })(
  Likes__Reposts
);
