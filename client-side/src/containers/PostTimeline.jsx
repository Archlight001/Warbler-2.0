import React, { useState } from "react";
import UserAside from "../components/UserAside";
import PostList from "./PostList";
import "../css/PostList.css";
import "../css/PostTimeline.css";
import Search from "./Search";

export default function PostTimeline({ username, profileImageUrl }) {
  return (
    <div className="general__container">
      <UserAside
        username={username}
        profileImageUrl={profileImageUrl}
      />
      <PostList />
      <Search />
    </div>
  );
}
