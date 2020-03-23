import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useGetData } from "use-axios-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { verifyLogin } from "../../actions/auth";

const PrivateRoute = ({
  component: Component,
  verifyLogin,
  submitted,
  ...rest
}) => {
  const [userInfo, loading] = useGetData("/api/current_user");

  return (
    <Route
      {...rest}
      render={props =>
        loading ? (
          // Put a cool animation here
          <div>Loading...</div>
        ) : !((!submitted && userInfo.submittedForm) || submitted) ? (
          <Redirect to='/helform'></Redirect>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    submitted: state.helForm.submitted
  };
};

PrivateRoute.propTypes = {
  submitted: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { verifyLogin })(PrivateRoute);
