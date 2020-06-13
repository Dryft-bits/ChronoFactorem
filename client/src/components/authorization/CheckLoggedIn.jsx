import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useGetData } from "use-axios-react";
import { connect } from "react-redux";
import { verifyLogin } from "../../redux/actions/auth";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

const CheckLoggedIn = ({ verifyLogin }) => {
  useEffect(() => {
    verifyLogin();
  }, [verifyLogin]);
  const [userInfo, loading] = useGetData("/api/current_user");
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const useStylesCircular = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& > * + *': {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
      },
    },
  }));
  const Cclasses = useStylesCircular();
  const classes = useStyles();
  if (true) {
    return (
      <>
        <div className={classes.root}>
          <LinearProgress />
        </div>
        <div className={Cclasses.root}>
          <CircularProgress />
        </div>
      </>/*<Redirect to='/checkloggedin'></Redirect>*/);
  } else if (!userInfo) {
    return <Redirect to='/'></Redirect>;
  } else {
    return <Redirect to='/dashboard'></Redirect>;
  }
};

export default connect(null, { verifyLogin })(CheckLoggedIn);
