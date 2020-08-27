import React from "react";
import "../css/Homepage.css";
import {Link} from "react-router-dom";


export default function Homepage() {
  return (
    <div className="home-hero">
      <h1>What's Happenning?</h1>
      <h4>New to Warbler?</h4>
      <Link to="/signup" className="btn btn-primary">
        Sign up here
      </Link>
    </div>
  );
}
