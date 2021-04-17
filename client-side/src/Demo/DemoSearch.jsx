import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { apiCall } from "../services/api";
import "../css/Search.css";
import UserAside from "../components/UserAside";
import DemoMiniSearchResults from "../Demo/DemoMiniSearchResults";

function DemoSearch({ recommend }) {
	let [param, setParam] = useState("");
	let [searchValues, setSearchValues] = useState([]);
	let [recommendList, setRecommendList] = useState([]);

	useEffect(() => {
		setRecommendList(
			recommend.map((value, index) => (
				<DemoMiniSearchResults
					key={index}
					id={index}
					displayName={value.displayName}
					username={value.username}
					profileImage={value.profileImage}
					showFollowButton
				/>
			))
		);
	}, []);

	return (
		<div className="general__container">
			{/*sidebar && (
				<div className="side__bar">
					<UserAside
						username={username}
						profileImage={profileImage}
						showSidebar={showSidebar}
					/>
				</div>
			)*/}

			<div style={{ width: "100%" }}>
				<div className="search">
					<div className="search__container">
						<input type="text" placeholder="Search" />
						<div className="search__icon">
							<SearchIcon />
						</div>
					</div>
					{searchValues.length !== 0 && (
						<div className="results__container">{searchValues}</div>
					)}
				</div>
				<div className="recommended__list">
					<h6 id="rc__header">RECOMMENDED LIST</h6>
					{recommendList}
				</div>
			</div>
		</div>
	);
}

export default DemoSearch;
