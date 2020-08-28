import React from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../images/warbler-logo.png";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";

function Navbar({ currentUser, logout:backtoHome }) {
  function logout(e) {
    debugger;
    e.preventDefault();
    backtoHome();
  }
  return (
    <div>
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <img src={Logo} alt="Warbler Home" />
            </Link>
          </div>
          {currentUser.isAuthenticated ? (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to={`/users/${currentUser.user.id}/messages/new`}>
                  New Message
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
