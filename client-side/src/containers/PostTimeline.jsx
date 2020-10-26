import React, { useState } from "react";
import UserAside from "../components/UserAside";
import PostList from "./PostList";
import "../css/PostList.css";
import HSFooter from "./HSFooter";
import Search from "./Search";

export default function PostTimeline({
  username,
  profileImage,
  sidebar,
  showSidebar,
}) {
  return (
    <div>
      <div className="general__container">
        {window.screen.width > 600 ? (
          <UserAside username={username} profileImage={profileImage} />
        ) : (
          sidebar && (
            <div className="side__bar">
              <UserAside
                username={username}
                profileImage={profileImage}
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
