import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import DemoPostMedia from "./DemoPostMedia";

export default function DemoPostItem({
	profileImage,
	username,
	text,
	date,
	noOfLikes,
	noOfReposts,
	postMedia,
	showDelete,
}) {
	let iconStyle = { color: "rgb(29, 135, 196)" };
	let media = [];
	if (postMedia.length === 1) {
		media = <DemoPostMedia key={1} postMedia={postMedia[0]} stretch />;
	} else {
		media = postMedia.map((value, index) => {
			return <DemoPostMedia key={index} postMedia={value} />;
		});
	}
	return (
		<div>
			<li className="list-group-item">
				<img
					src={`images/${profileImage}`}
					alt={username}
					height="100"
					width="100"
					className="timeline-image"
				/>
				<div className="message__area">
					<div className="message__area__title">
						<div>
							@{username} &nbsp;
							<span className="text-muted">{date}</span>
						</div>
					</div>

					<p>{text}</p>

					{postMedia.length !== 0 && <div className="mediaDiv">{media}</div>}

					<div className="message__area__operations">
						<div className="message__area__icons">
							<div style={iconStyle} className="message__area__icon">
								<FavoriteIcon />
								<span style={iconStyle}>{noOfLikes}</span>
							</div>

							<div style={iconStyle} className="message__area__icon">
								<RotateRightIcon />
								<span style={iconStyle}>{noOfReposts}</span>
							</div>
						</div>

						{showDelete && <a className="btn btn-danger">Delete</a>}
					</div>
				</div>
			</li>
		</div>
	);
}
