import React, { useState } from "react";
import UserAside from "../components/UserAside";
import PostList from "./PostList";
import "../css/PostList.css";

export default function PostTimeline({ username, profileImageUrl }) {
  const [state, setState] = useState({ showProfile: false });

  function show(value) {
    let profile = false;
    switch (value) {
      case "Home":
        setState({ showProfile: profile });
        break;

      case "Profile":
        profile = true;
        setState({ showProfile: profile });
        break;

      default:
        break;
    }
  }
  return (
    <div className="row">
      <UserAside
        username={username}
        show={show}
        profileImageUrl={profileImageUrl}
      />
      {state.showProfile ? <PostList profile /> : <PostList />}
    </div>
  );
}
