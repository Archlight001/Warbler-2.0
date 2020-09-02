import React from "react";
import { connect } from "react-redux";
import {Route, withRouter } from "react-router-dom";
import Authform from "../components/Authform";
import Homepage from "../components/Homepage";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import PostForm from "../components/PostForm";
function Main(props) {
  const { authUser, errors, removeError, currentUser } = props;
  return (
    <div className="container">
      <Route exact path="/">
        <Homepage {...props} currentUser={currentUser} />
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

      <Route path="/users/:id/posts/new" component={withAuth(PostForm)}/>
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
