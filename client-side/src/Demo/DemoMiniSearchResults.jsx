import React, { useState } from "react";

function DemoMiniSearchResults({
	id,
	displayName,
	username,
	profileImage,
	showFollowButton,
}) {
	let [following, setFollowing] = useState(false);

	return (
		<div className="general__mini__profile">
			<div className="user__profile__mini">
				<div className="img__div__mini">
					<img src={`images/${profileImage}`} alt="username" />
				</div>
				<div className="otherInfo__div__mini">
					<h6>{displayName}</h6>
					<span>@{username}</span>
				</div>
			</div>
			{showFollowButton && (
				<div className="follow__btn__mini">
					<button className="btn btn-info">
						{following ? "Following" : "Follow"}
					</button>
				</div>
			)}
		</div>
	);
}

export default DemoMiniSearchResults;
