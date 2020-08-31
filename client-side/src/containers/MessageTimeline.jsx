import React from "react";
import UserAside from "../components/UserAside";
import MessageList from "./MessageList";

export default function MessageTimeline({username,profileImageUrl}){
    return(
        <div className="row">
            <UserAside username={username} profileImageUrl={profileImageUrl} />
            <MessageList />
        </div>
    )
}