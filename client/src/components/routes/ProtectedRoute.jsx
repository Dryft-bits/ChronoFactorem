import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !localStorage.getItem("prof") ? (
          <Redirect to='/'></Redirect>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
