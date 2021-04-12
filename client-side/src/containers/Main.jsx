import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Redirect } from "react-router-dom";
import Authform from "../components/Authform";
import Homepage from "../components/Homepage";
import Likes__Reposts from "./Likes__Reposts";
import Profile from "./Profile";
import { authUser, setCurrentUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth, { withId } from "../hocs/withAuth";
import PostForm from "../components/PostForm";
import FollowList from "./FollowList";
import Search from "./Search";
import { apiCall } from "../services/api";
import Demo from "../Demo/Demo";

function Main(props) {
	const { authUser, errors, removeError, currentUser, setCurrentUser } = props;
	useEffect(() => {
		if (props.currentUser.isAuthenticated === true) {
			try {
				apiCall(
					"get",
					`/api/userops/${props.currentUser.user.id}/getProfileImage/`
				)
					.then((res) => {
						setCurrentUser({
							...props.currentUser.user,
							profileImage: res.profileImage,
						});
					})
					.catch((e) => {
						console.log(e);
					});
			} catch (error) {
				console.log(error);
			}
		}
	}, [props.currentUser.isAuthenticated]);

	return (
		<div className="container">
			<Route exact path="/">
				<Homepage {...props} currentUser={currentUser} />
			</Route>

			<Route exact path="/demo">
				<Demo {...props} />
			</Route>
			<Route exact path="/profile">
				<Profile
					{...props}
					profileImage={currentUser.user.profileImage}
					username={currentUser.user.username}
				/>
			</Route>

			<Route exact path="/profile/:username">
				{props.location.state ? (
					<Profile
						{...props}
						profileImage={currentUser.user.profileImage}
						username={currentUser.user.username}
						otherUser
					/>
				) : (
					<Redirect to="/" />
				)}
			</Route>

			<Route exact path="/post/:postId/:show">
				<Likes__Reposts
					{...props}
					profileImage={currentUser.user.profileImage}
					username={currentUser.user.username}
					list={props.location.state?.list}
					op={props.location.state?.ops}
					id={currentUser.user.id}
				/>
			</Route>

			<Route exact path="/profile/:username/:followOp">
				<FollowList
					{...props}
					profileImage={currentUser.user.profileImage}
					username={currentUser.user.username}
					userInfo={props.location.state?.userInfo}
					followOp={props.location.state?.followOp}
				/>
			</Route>

			<Route exact path="/signup">
				<Authform
					{...props}
					removeError={removeError}
					error={errors}
					onAuth={authUser}
					heading="Join Warbler Today."
					buttonText="Sign me Up"
					signup
				/>
			</Route>

			<Route exact path="/signin">
				<Authform
					{...props}
					removeError={removeError}
					error={errors}
					onAuth={authUser}
					heading="Welcome back."
					buttonText="Sign in"
				/>
			</Route>

			{window.screen.width < 600 && (
				<Route exact path="/search">
					<Search
						{...props}
						profileImage={currentUser.user.profileImage}
						username={currentUser.user.username}
					/>
				</Route>
			)}

			<Route
				path="/users/:id/posts/new"
				component={withAuth(PostForm, props)}
			/>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		errors: state.errors,
	};
}

export default withRouter(
	connect(mapStateToProps, { authUser, removeError, setCurrentUser })(Main)
);
