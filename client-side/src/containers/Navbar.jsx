import React from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../images/warbler-logo.png";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <img src={Logo} alt="Warbler Home" />
            </Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/signin">Log in</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
