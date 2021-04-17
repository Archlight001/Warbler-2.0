import React, { useEffect, useState } from "react";
import "../css/Navbar.css";
import { Link, useHistory } from "react-router-dom";
import Logo from "../images/warbler-logo.png";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";

function Navbar({
	currentUser,
	logout: backtoHome,
	showSidebar,
	sidebar,
	location,
}) {
	const history = useHistory();
	function logout(e) {
		e.preventDefault();
		backtoHome();
		history.replace("/");
	}
	var screen_width = window.screen.width;
	var change = sidebar === true ? "change" : "";

	var [demoPage, isDemoPage] = useState(false);
	useEffect(() => {
		if (history.location.pathname === "/demo") {
			isDemoPage(!demoPage);
		}
	}, [history]);

	console.log(history.location.pathname);
	return (
		<div>
			<nav className="navbar navbar-expand">
				<div className="container-fluid">
					<div className="navbar-header">
						{screen_width < 600 && currentUser.isAuthenticated ? (
							<div className={`hamburger__div ${change}`} onClick={showSidebar}>
								<div className="bar1"></div>
								<div className="bar2"></div>
								<div className="bar3"></div>
							</div>
						) : (
							<Link
								to="/"
								className="navbar-brand"
								onClick={() => {
									isDemoPage(!demoPage);
								}}
							>
								<img src={Logo} alt="Warbler Home" />
							</Link>
						)}
					</div>
					{currentUser.isAuthenticated ? (
						<ul className="nav navbar-nav navbar-right">
							<li>
								<Link to={`/users/${currentUser.user.id}/posts/new`}>
									New Post
								</Link>
							</li>
							<li>
								<a onClick={logout}>Log out</a>
							</li>
						</ul>
					) : (
						<div>
							{!demoPage ? (
								<ul className="nav navbar-nav navbar-right">
									<li
										className="demo__button"
										onClick={() => {
											isDemoPage(!demoPage);
										}}
									>
										<Link to={{ pathname: "/demo", state: { demo: true } }}>
											Demo
										</Link>
									</li>
									<li>
										<Link to="/signup">Sign up</Link>
									</li>
									<li>
										<Link to="/signin">Log in</Link>
									</li>
								</ul>
							) : (
								<ul className="nav navbar-nav navbar-right">
									<li>Warbler Demo Page</li>
								</ul>
							)}
						</div>
					)}
				</div>
			</nav>
		</div>
	);
}

function mapReduxStatetoProps(state) {
	return {
		currentUser: state.currentUser,
	};
}

export default connect(mapReduxStatetoProps, { logout })(Navbar);
