import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { verifyLogin } from "../../redux/actions/auth";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { useEffect } from "react";

const PrivateRoute = ({
  component: Component,
  verifyLogin,
  submitted,
  isAuthenticated,
  ...rest
}) => {

  const [userInfo, setUserInfo] = React.useState(null);
  useEffect(() => {
    axios.get("/api/current_user").then((response) => {
      setUserInfo(response.data);
    }).catch((error) => {
      console.log(error.toJSON());
    });


  }, []);
  const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2)
      }
    }
  }));

  const useStylesCircular = makeStyles(theme => ({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& > * + *": {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2)
      }
    }
  }));
  const Cclasses = useStylesCircular();
  const classes = useStyles();
  return (
    <Route
      {...rest}
      render={props =>
        !localStorage.getItem("loggedIn") ? (
          <Redirect to='/'></Redirect>
        ) : !userInfo ? (
          <>
            <div className={classes.root}>
              <LinearProgress />
            </div>
            <div className={Cclasses.root}>
              <CircularProgress />
            </div>
          </>
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
    submitted: state.helForm.submitted,
    isAuthenticated: state.auth.isAuthenticated
  };
};

PrivateRoute.propTypes = {
  submitted: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { verifyLogin })(PrivateRoute);
