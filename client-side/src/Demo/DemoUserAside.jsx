import React from "react";

export default function DemoUserAside({ username, profileImage }) {
	return (
		<aside className="col-sm-2">
			<div className="panel panel__default">
				<div className="panel__body">
					<div className="useraside__img__div">
						<img
							src={`images/${profileImage}`}
							alt={username}
							target="_blank"
							className="img-fluid"
						/>
					</div>

					<h4>{username}</h4>
				</div>
			</div>
		</aside>
	);
}
