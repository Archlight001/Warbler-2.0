import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { apiCall } from "../services/api";
import MiniSearchResults from "../components/MiniSearchResults";
import "../css/Search.css";
import { connect } from "react-redux";
import UserAside from "../components/UserAside";

function Search({ currentUser,sidebar,showSidebar,username,profileImage }) {
  let [param, setParam] = useState("");
  let [searchValues, setSearchValues] = useState([]);
  let [recommendList, setRecommendList] = useState([]);

  useEffect(() => {
    apiCall("get", `/api/userops/${currentUser}/recommend`)
      .then((values) => {
        setRecommendList(
          values.map((value, index) => (
            <MiniSearchResults
              key={index}
              id={value._id}
              displayName={value.displayName}
              username={value.username}
              profileImage={value.profileImage}
              showFollowButton
            />
          ))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentUser]);

  function handleChange(e) {
    setParam(e.target.value);
    apiCall("post", `/api/userops/${currentUser}/search`, {
      params: e.target.value,
    })
      .then((values) => {
        setSearchValues(
          values.map((value, index) => (
            <MiniSearchResults
              key={index}
              id={value._id}
              displayName={value.displayName}
              username={value.username}
              profileImage={value.profileImage}
            />
          ))
        );
      })
      .catch((error) => {
        console.log(error);
      });
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

      <div style={{ width: "100%" }}>
        <div className="search">
          <div className="search__container">
            <input
              value={param}
              onChange={handleChange}
              type="text"
              placeholder="Search"
            />
            <div className="search__icon">
              <SearchIcon />
            </div>
          </div>
          {searchValues.length !== 0 && (
            <div className="results__container">{searchValues}</div>
          )}
        </div>
        <div className="recommended__list">
          <h6 id="rc__header">RECOMMENDED LIST</h6>
          {recommendList}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ currentUser: state.currentUser.user.id });

export default connect(mapStateToProps)(Search);
