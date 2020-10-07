import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { apiCall } from "../services/api";
import MiniSearchResults from "../components/MiniSearchResults";
import "../css/Search.css";
import { connect } from "react-redux";

function Search({ currentUser }) {
  let [param, setParam] = useState("");
  let [searchValues, setSearchValues] = useState([]);
  let [recommendList, setRecommendList] = useState([]);

  useEffect(() => {
    apiCall("get", `/api/userops/${currentUser}/recommend`)
      .then((values) => {
        setRecommendList(values.map((value, index) => (
          <MiniSearchResults
            key={index}
            id={value._id}
            displayName={value.displayName}
            username={value.username}
            profileImageUrl={value.profileImageUrl}
            showFollowButton
          />
        )))
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
              profileImageUrl={value.profileImageUrl}
            />
          ))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  
  return (
    <div>
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
        {recommendList}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ currentUser: state.currentUser.user.id });

export default connect(mapStateToProps)(Search);
