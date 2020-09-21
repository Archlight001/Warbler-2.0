import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { apiCall } from "../services/api";
import MiniSearchResults from "../components/MiniSearchResults";
import "../css/Search.css";
import { connect } from "react-redux";

function Search({ currentUser }) {
  let [param, setParam] = useState("");
  let [searchValues, setSearchValues] = useState([]);

  function handleChange(e) {
    console.log(e.target.value);
    setParam(e.target.value);

    apiCall("post", `/api/userops/${currentUser}/search`, {
      params: e.target.value,
    })
      .then((values) => {
        setSearchValues(
          values.map((value, index) => (
            <MiniSearchResults
              key={index}
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

  function getResults() {}

  return (
    <div>
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
  );
}

const mapStateToProps = (state) => ({ currentUser: state.currentUser.user.id });

export default connect(mapStateToProps)(Search);
