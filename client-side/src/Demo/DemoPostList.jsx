import React from "react";
import DemoPostItem from "../Demo/DemoPostItem";

export default function DemoPostList({ posts }) {
	let postList = posts?.map((post, index) => (
		<DemoPostItem
			key={index}
			profileImage={post.profileImage}
			username={post.username}
			text={post.post}
			date={post.date}
			noOfLikes={post.likes}
			noOfReposts={post.reposts}
			postMedia={post.medias}
			showDelete={post.showDelete}
		/>
	));

	console.log(posts);

	return (
		<div className="row col-sm-8">
			<div className="offset-1 col-sm-10">
				<ul className="list-group" id="posts">
					{postList}
				</ul>
			</div>
		</div>
	);
}
