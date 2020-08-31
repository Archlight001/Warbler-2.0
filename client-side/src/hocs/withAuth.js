import { connect } from "react-redux";

import React, { useEffect } from "react";

export default function withAuth(ComponentToBeRendered) {
  function Authenticate(props) {
    useEffect(() => {
      if (props.isAuthenticated === false) {
        props.history.push("/signin");
      }
    });

    return <ComponentToBeRendered {...props} />;
  }

  function mapReduxStateToProps(state) {
    return {
      isAuthenticated: state.currentUser.isAuthenticated,
    };
  }

  return connect(mapReduxStateToProps)(Authenticate);
}
