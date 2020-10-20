import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import "../css/HSFooter.css";

function HSFooter({ screenWidth, screenHeight }) {
  return (
    <div className="hs__footer__main__container">
      <div className="hs__footer__sub__container">
        <div className="hs__footer__home__icon">
          <HomeIcon />
        </div>
        <div className="hs__footer__search__icon">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}

export default HSFooter;
