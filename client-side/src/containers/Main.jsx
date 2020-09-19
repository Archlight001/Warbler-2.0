import React from "react";
import { connect } from "react-redux";
import { Route, withRouter, Redirect } from "react-router-dom";
import Authform from "../components/Authform";
import Homepage from "../components/Homepage";
import Likes__Reposts from "./Likes__Reposts";
import Profile from "./Profile";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth, { withId } from "../hocs/withAuth";
import PostForm from "../components/PostForm";
import FollowList from "./FollowList";
function Main(props) {
  const { authUser, errors, removeError, currentUser } = props;
  return (
    <div className="container">
      <Route exact path="/">
        <Homepage {...props} currentUser={currentUser} />
      </Route>

      <Route exact path="/profile">
        <Profile
          {...props}
          profileImageUrl={currentUser.user.profileImageUrl}
          username={currentUser.user.username}
        />
      </Route>

      <Route exact path="/profile/:username">
        {props.location.state ? (
          <Profile
            {...props}
            profileImageUrl={currentUser.user.profileImageUrl}
            username={currentUser.user.username}
            otherUser
          />
        ) : (
          <Redirect to="/" />
        )}
      </Route>

      <Route exact path="/post/:postId/:show">
        <Likes__Reposts list={props.location.state?.list} ops={props.location.state?.ops} />
      </Route>

      <Route exact path="/profile/:username/:followOp">
        <FollowList userInfo={props.location.state?.userInfo} followOp={props.location.state?.followOp} />
        
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

      <Route path="/users/:id/posts/new" component={withAuth(PostForm)} />
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
  connect(mapStateToProps, { authUser, removeError })(Main)
);
