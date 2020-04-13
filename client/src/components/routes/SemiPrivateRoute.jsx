/**
 * This route is only for the humanities form.
 * Using the PrivateRoute puts it in an infinite route loop
 */

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useGetData } from "use-axios-react";

const SemiPrivateRoute = ({ component: Component, ...rest }) => {
  const [userInfo, loading] = useGetData("/api/current_user");

  return (
    <Route
      {...rest}
      render={props =>
        // Put a cool animation here
        !userInfo ? (
          <Redirect to='/'></Redirect>
        ) : loading ? (
          <div>Loading...</div>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default connect(null, null)(SemiPrivateRoute);
