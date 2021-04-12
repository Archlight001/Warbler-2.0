import React, { useState } from "react";

export default function DemoPostMedia({ postMedia, stretch }) {
	//let mediaExtension = postMedia.slice(postMedia.lastIndexOf("."));
	let mediaType = "image";

	const [show, setVal] = useState(false);

	function handleClick() {
		setVal(!show);
	}

	return (
		<div style={stretch && { width: "60%" }}>
			<img
				onClick={handleClick}
				src={`images/${postMedia}`}
				height="250"
				width="400"
				alt=""
			/>

			{show && (
				<div className="enlargeMedia" onClick={handleClick}>
					<img src={`images/${postMedia}`} alt="Enlarged post" />
				</div>
			)}
		</div>
	);
}
