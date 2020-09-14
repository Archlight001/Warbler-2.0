import React, { useState } from "react";
import UserAside from "../components/UserAside";
import PostList from "./PostList";
import "../css/PostList.css";

export default function PostTimeline({ username, profileImageUrl }) {
  return (
    <div className="row">
      <UserAside
        username={username}
        profileImageUrl={profileImageUrl}
      />
      <PostList />
    </div>
  );
}
