import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import "../css/UserProfile.css";

function UserProfile({
  profileImage,
  followers,
  userInfo,
  modifyProfileInfo,
  isFollowing,
  sameUser,
  followOperation,
  currentUser,
}) {
  let [showEdit, toggleEdit] = useState({
    displayName: false,
    description: false,
  });

  let [displayName, setdisplayName] = useState("");
  let [description, setDescription] = useState("");

  let followStatus = isFollowing ? "unfollow" : "follow";

  const showModifyProfile = (value) => {
    setdisplayName(userInfo.displayName);
    setDescription(userInfo.description);

    value === "displayName"
      ? toggleEdit({ ...showEdit, displayName: !showEdit.displayName })
      : toggleEdit({ ...showEdit, description: !showEdit.description });
  };

  const modifyProfile = (value) => {
    if (value === "displayName") {
      if (displayName.trim() !== "") {
        modifyProfileInfo(currentUser.id, displayName, value);
        showModifyProfile("displayName");
      } else {
        alert("Empty fields are not allowed");
      }
    } else if (value === "description") {
      modifyProfileInfo(currentUser.id, description, value);
      showModifyProfile("description");
    }
  };
  let image = ""
  if(profileImage !== undefined){
    image = `data:${profileImage[0]?.contentType};base64,${profileImage[0]?.data}`
  }
  return (
      <div>
    <li className="list-group-item">
    <div id="profile" style={window.screen.width<600?{"display":"block"}:{}}>
      <div className="profile__img__div">
        <img
          src={ image || DefaultProfileImg}
          alt="Profile pic"
        />
      </div>
      <div className="profile-details">
        {!showEdit.displayName ? (
          <div className="edit-field">
            <h3>{userInfo.displayName}</h3>
            {sameUser && (
              <i
                onClick={showModifyProfile.bind(this, "displayName")}
                id="displayName"
                className="fas fa-edit"
              />
            )}
          </div>
        ) : (
          <div className="edit__displayName">
            <input
              type="text"
              name="displayName"
              value={displayName}
              onChange={(e) => setdisplayName(e.target.value)}
            />
            <div className="edit__icons">
              <div>
                <CheckIcon onClick={modifyProfile.bind(this, "displayName")} />
              </div>
              <div>
                <CloseIcon
                  onClick={showModifyProfile.bind(this, "displayName")}
                />
              </div>
            </div>
          </div>
        )}

        <h6>@{userInfo.username}</h6>
        {!showEdit.description ? (
          <div className="edit-field">
            <p>{userInfo.description}</p>
            {sameUser && (
              <i
                onClick={showModifyProfile.bind(this, "description")}
                className="fas fa-edit "
                id="description__edit__icon"
              ></i>
            )}
          </div>
        ) : (
          <div className="edit__description">
            <textarea
              name="description"
              value={description}
              rows="5"
              cols="30"
              maxLength="160"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="edit__icons">
              <div>
                <CheckIcon onClick={modifyProfile.bind(this, "description")} />
              </div>
              <div>
                <CloseIcon
                  onClick={showModifyProfile.bind(this, "description")}
                />
              </div>
            </div>
          </div>
        )}

        <ul>
          <Link
            to={{
              pathname: `/profile/${userInfo.username}/followers`,
              state: { userInfo: userInfo, followOp: "followers" },
            }}
          >
            <li>{followers} Followers</li>
          </Link>
          <Link
            to={{
              pathname: `/profile/${userInfo.username}/following`,
              state: { userInfo: userInfo, followOp: "following" },
            }}
          >
            <li>
              {userInfo?.following && userInfo?.following.length} Following
            </li>
          </Link>
        </ul>
      </div>

      {!sameUser && (
        <div style={window.screen.width<600?{"width":"100%"}:{}} className="follow__btn">
          <button
            style={window.screen.width<600?{"width":"100%"}:{}} 
            onClick={followOperation.bind(
              this,
              currentUser.id,
              userInfo.username,
              followStatus
            )}
            className="btn btn-info"
          >
            {followStatus === "follow" ? "Follow" : "Following"}
          </button>
        </div>
      )}
    </div>
    </li>
    </div>
  );
}

export default UserProfile;
