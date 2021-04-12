import React, { useEffect, useState } from "react";
import DemoUserAside from "../Demo/DemoUserAside.jsx";
import DemoPostList from "../Demo/DemoPostList";
import DemoSearch from "../Demo/DemoSearch";
export default function Demo({ sidebar, showSidebar }) {
	const [demoData, setDemoData] = useState({});

	useEffect(() => {
		fetch("demoData.json")
			.then((res) => res.json())
			.then((data) => setDemoData({ ...data }));
	}, []);

	console.log(demoData.currentUser);
	return (
		<div className="general__container">
			{demoData.currentUser !== undefined &&
				(window.screen.width > 600 ? (
					<DemoUserAside
						username={demoData?.currentUser.username}
						profileImage={demoData?.currentUser.profileImage}
					/>
				) : (
					sidebar && (
						<div className="side__bar">
							<DemoUserAside
								username={demoData?.currentUser.username}
								profileImage={demoData?.currentUser.profileImage}
								showSidebar={showSidebar}
							/>
						</div>
					)
				))}

			{demoData.currentUser !== undefined && (
				<DemoPostList posts={demoData.posts} />
			)}
			{demoData.currentUser !== undefined && window.screen.width > 600 && (
				<DemoSearch recommend={demoData.recommend} />
			)}
		</div>
	);
}
