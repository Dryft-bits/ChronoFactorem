import React from "react";
import "../../styles/Landing.css";
import configuration from "../../config/constants.js";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import Cookies from 'js-cookie';
import { addProf } from '../../actions/auth';
import CreateAccount from './CreateAccount';
import { useGetData } from "use-axios-react";

export const Landing = ({ isAuthenticated }) => {

  const token = Cookies.get("token") ? Cookies.get("token") : null;
  const [userInfo, loading] = useGetData("/api/profAuth/profloggedIn", { token: token });

  const [open, setOpen] = useState({
    isOpen: false,
    username: "",
    password: "",
    incorrectUsername: false,
    incorrectPassword: false,
    profAuthenticated: false,
    isCreate: false,
  });
  const handleCreate = () => {
    setOpen({
      ...open,
      isCreate: true
    });
  }
  const handleClickOpen = () => {
    setOpen({ ...open, isOpen: true });
  };

  const handleClose = () => {
    setOpen({ ...open, isOpen: false });
  };

  const editUsername = (e) => {
    e.preventDefault();
    setOpen({
      ...open,
      username: e.target.value,
      incorrectUsername: false
    });
  }
  const editPassword = (e) => {
    e.preventDefault();
    setOpen({
      ...open,
      password: e.target.value,
      incorrectPassword: false,
    });
  }
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const submit = (e) => {
    let iu = false, ip = false;
    e.preventDefault();
    console.log(JSON.stringify({
      username: open.username,
      password: open.password
    }));
    axios.post("/api/ProfAuth", JSON.stringify({
      username: open.username,
      password: open.password
    }), config).then(
      (res, err) => {
        if (err) {
          console.log(err);
        }
        if (res === null || res === undefined || res.status === 204) {
          iu = true;
        }
        else {
          iu = false
          if(res.status === 205)
            ip = true;
          else 
            ip = false;
          open.profAuthenticated = true;
          //store the token in HTTP cookie
          Cookies.set('token', res.token, { expires: 1 });
        }

      }
    );
    setOpen({
      ...open,
      incorrectUsername: iu,
      incorrectPassword: ip
    });
  }

  if (isAuthenticated) {
    return <Redirect to='/checkloggedin'></Redirect>;
  }


  if (open.isOpen) {

    if (!token) {
    }
    else {

      if (!loading && userInfo) {
        addProf(userInfo);
        return /*redirect to admin dashboard here */;
      }
    }

  }

  return (

    <section className='landing body'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <div className='main'>
            <h1 className='text-x-large text-landing'>ChronoFactorem</h1>
            <p className='text-large text-landing description center'>
              Create your own timetable.
            </p>
            <div>
              <button className='btn-landing btn-left' onClick={handleClickOpen}>
                <span>Staff </span>
              </button>
              <a href={configuration.urls.googleAuth}>
                <button className='btn-landing btn-right'>
                  <span>Student </span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Dialog open={open.isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
          <form onSubmit={submit}>
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter your username and password
          </DialogContentText>
              <TextField
                autoFocus
                error={open.incorrectUsername}
                margin="dense"
                id="name"
                label="Username"
                type="text"
                fullWidth
                onChange={editUsername}
                helperText={open.incorrectUsername ? "Username does not exist" : ""}
              />
              <TextField
                error={open.incorrectPassword}
                autoFocus
                margin="dense"
                id="name"
                label="Password"
                type="password"
                fullWidth
                onChange={editPassword}
                helperText={open.incorrectPassword ? "Incorrect Password for given username" : ""}
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
          </Button>
              <Button type='submit' color="primary">
                Login
          </Button>
              <Button onClick={handleCreate} color="primary">
                Create new
          </Button>
            </DialogActions>
          </form>
        </Dialog>
        <CreateAccount {...open.isCreate} />
      </div>
    </section>);

};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProf: dispatch(prof => addProf(prof))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
