import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import Authform from "../components/Authform";
import Homepage from "../components/Homepage";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
function Main(props) {
  const { authUser, errors, removeError, currentUser } = props;
  return (
    <div className="container">
      <Route exact path="/">
        <Homepage />
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
