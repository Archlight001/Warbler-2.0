import React,{useState} from "react";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import "../css/HSFooter.css";
import { useHistory } from "react-router-dom";

function HSFooter({ screenWidth, screenHeight }) {
  let history = useHistory();
  const path = history.location.pathname;
  let [active,setActive]= useState(path)

  function redirect(location) {
    switch (location) {
      case "search":
        history.push("/search");
        setActive("/search")
        break;
      case "home":
        history.push("/");
        setActive("/")
      default:
        break;
    }
  }

  const style = {"backgroundColor":"rgb(185, 197, 206)"}
  return (
    <div className="hs__footer__main__container">
      <div className="hs__footer__sub__container">
        <div style={active === "/"?style:{}} onClick={redirect.bind(this, "home")} className="hs__footer__home__icon">
          <HomeIcon />
        </div>
        <div
        style={active === "/search"?style:{}}
          onClick={redirect.bind(this, "search")}
          className="hs__footer__search__icon"
        >
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}

export default HSFooter;
