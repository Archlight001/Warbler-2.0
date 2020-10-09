import React from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../images/warbler-logo.png";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";

function Navbar({ currentUser, logout: backtoHome,showSidebar,sidebar }) {
  function logout(e) {
    e.preventDefault();
    backtoHome();
  }
  var screen_width = window.screen.width;
  var change = sidebar === true? "change":"";
  return (
    <div>
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            {screen_width > 600 ? (
              <Link to="/" className="navbar-brand">
                <img src={Logo} alt="Warbler Home" />
              </Link>
            ) : (
              <div className={`hamburger__div ${change}`} onClick={showSidebar}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
              </div>
            )}
          </div>
          {currentUser.isAuthenticated ? (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to={`/users/${currentUser.user.id}/posts/new`}>
                  New Post
                </Link>
              </li>
              <li>
                <a onClick={logout}>Log out</a>
              </li>
            </ul>
          ) : (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
              <li>
                <Link to="/signin">Log in</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}

function mapReduxStatetoProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapReduxStatetoProps, { logout })(Navbar);
