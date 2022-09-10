import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { verifyLogin } from "../../redux/actions/auth";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

const CheckLoggedIn = ({ verifyLogin }) => {
  useEffect(() => {
    verifyLogin();
  }, [verifyLogin]);

  const [userInfo, setUserInfo]=React.useState(null);
  useEffect(() => {
  axios.get("/api/current_user").then((response) => {
    setUserInfo(response.data);
  }).catch((error) => {
    console.log(error.toJSON());
  });
  },[]);


  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const useStylesCircular = makeStyles((theme) => ({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& > * + *": {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
      },
    },
  }));
  const Cclasses = useStylesCircular();
  const classes = useStyles();
  if (localStorage.getItem("loggedIn") && !userInfo) {
    return (
      <>
        <div className={classes.root}>
          <LinearProgress />
        </div>
        <div className={Cclasses.root}>
          <CircularProgress />
        </div>
      </> /*<Redirect to='/checkloggedin'></Redirect>*/
    );
  } else if (!userInfo) {
    return <Redirect to="/"></Redirect>;
  } else {
    return <Redirect to="/create"></Redirect>;
  }
};

export default connect(null, { verifyLogin })(CheckLoggedIn);
