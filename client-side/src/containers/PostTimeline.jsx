import React, { useState } from "react";
import UserAside from "../components/UserAside";
import PostList from "./PostList";
import "../css/PostList.css";
import "../css/PostTimeline.css";
import HSFooter from "./HSFooter";
import Search from "./Search";

export default function PostTimeline({
  username,
  profileImageUrl,
  sidebar,
  showSidebar,
}) {
  return (
    <div>
      <div className="general__container">
        {window.screen.width > 600 ? (
          <UserAside username={username} profileImageUrl={profileImageUrl} />
        ) : (
          sidebar && (
            <div className="side__bar">
              <UserAside
                username={username}
                profileImageUrl={profileImageUrl}
                showSidebar={showSidebar}
              />
            </div>
          )
        )}

        <PostList />

        {window.screen.width>600 && <Search />}
        {/* {window.screen.width < 600 && <HSFooter screenWidth={window.screen.width} screenHeight ={window.screen.height} />}  */}
      </div>
      
    </div>
  );
}
