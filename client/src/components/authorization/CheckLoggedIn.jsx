import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useGetData } from "use-axios-react";
import { connect } from "react-redux";
import { verifyLogin } from "../../actions/auth";

const CheckLoggedIn = ({ verifyLogin }) => {
  useEffect(() => {
    verifyLogin();
  }, [verifyLogin]);
  const [userInfo, loading] = useGetData("/api/current_user");

  if (loading) {
    return <Redirect to='/checkloggedin'></Redirect>;
  } else if (!userInfo) {
    return <Redirect to='/'></Redirect>;
  } else {
    return <Redirect to='/dashboard'></Redirect>;
  }
};

export default connect(null, { verifyLogin })(CheckLoggedIn);
