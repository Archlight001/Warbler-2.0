import { connect } from "react-redux";

import React, { useEffect } from "react";

export default function withAuth(ComponentToBeRendered,prop) {
  function Authenticate(props) {
    useEffect(() => {
      if (props.isAuthenticated === false) {
        props.history.push("/signin");
      }
    });


    return <ComponentToBeRendered {...props} sidebar={prop.sidebar} showSidebar={prop.showSidebar} />;
  }

  function mapReduxStateToProps(state) {
    return {
      isAuthenticated: state.currentUser.isAuthenticated,
    };
  }

  return connect(mapReduxStateToProps)(Authenticate);
}


