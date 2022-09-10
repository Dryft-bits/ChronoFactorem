/**
 * This route is only for the humanities form.
 * Using the PrivateRoute puts it in an infinite route loop
 */

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const SemiPrivateRoute = ({ component: Component, ...rest }) => {
  const [userInfo, setUserInfo] = React.useState(null);
  useEffect(() => {
    axios.get("/api/current_user").then((response) => {
      setUserInfo(response.data);
    }).catch((error) => {
      console.log(error.toJSON());
    });
  }, []);

  return (
    <Route
      {...rest}
      render={props =>
        // Put a cool animation here
        !userInfo && !localStorage.getItem("loggedIn") ? (
          <Redirect to='/'></Redirect>
        ) : !userInfo ? (
          <div>Loading...</div>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default connect(null, null)(SemiPrivateRoute);
