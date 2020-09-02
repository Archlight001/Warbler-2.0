import React from "react";
import UserAside from "../components/UserAside";
import PostList from "./PostList";

export default function PostTimeline({username,profileImageUrl}){
    return(
        <div className="row">
            <UserAside username={username} profileImageUrl={profileImageUrl} />
            <PostList />
        </div>
    )
}