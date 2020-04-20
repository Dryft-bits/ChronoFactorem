import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({
  component: Component,
  checkProf,
  profAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !localStorage.getItem("prof") ? (
          <Redirect to='/'></Redirect>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    profAuthenticated: state.auth.profAuthenticated
  };
};


export default connect(mapStateToProps, null)(PrivateRoute);