import React from "react";
import "../../styles/Landing.css";
import configuration from "../../config/constants.js";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import Cookies from "js-cookie";
import { addProf } from "../../redux/actions/auth";
import CreateAccount from "../forms/CreateAccount";
import { Route } from 'react-router-dom';
export const Landing = ({ isAuthenticated, profAuthenticated, addProf }) => {
  let token = Cookies.get("token") ? Cookies.get("token") : null;

  addProf(token);

  const [open, setOpen] = useState({
    isOpen: false,
    username: "",
    password: "",
    incorrectUsername: false,
    incorrectPassword: false,
    isCreate: false
  });
  const {
    isOpen,
    username,
    password,
    incorrectUsername,
    incorrectPassword,
    isCreate
  } = open;
  const handleCreate = () => {
    setOpen({
      ...open,
      isCreate: !isCreate
    });
  };
  const handleClickOpen = () => {
    setOpen({ ...open, isOpen: true });
  };

  const handleClose = () => {
    setOpen({ ...open, isOpen: false });
  };

  const editUsername = e => {
    e.preventDefault();
    setOpen({
      ...open,
      username: e.target.value,
      incorrectUsername: false
    });
  };
  const editPassword = e => {
    e.preventDefault();
    setOpen({
      ...open,
      password: e.target.value,
      incorrectPassword: false
    });
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  };
  const submit = async e => {
    let iu = false,
      ip = false;
    e.preventDefault();
    await axios
      .post(
        "/api/ProfAuth",
        {
          username: username,
          password: password
        },
        config
      )
      .then(function (res) {
        if (!res || res.status === 204) {
          iu = true;
        } else {
          iu = false;
          if (res.status === 206) {
            ip = true;
          } else {
            ip = false;
            //store the token in HTTP cookie
            Cookies.set("token", res.data.token, { expires: 1 });
            addProf(res.data.token);
          }
        }
        setOpen({
          ...open,
          incorrectUsername: iu,
          incorrectPassword: ip
        });
      })
      .catch(err => {
        console.log("Axios Error:", err);
      });
  };

  if (profAuthenticated) {
    //redirect to dash here
    return <Route path='/' component={() => {
      window.location.href = configuration.urls.adminLogin;
      return null;
    }} />;
  }

  if (isAuthenticated) {
    return <Redirect to='/checkloggedin'></Redirect>;
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

              <button className='btn-landing btn-left' onClick={handleClickOpen}
              >
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
        <Dialog
          open={isOpen}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
        >
          <form onSubmit={submit}>
            <DialogTitle id='form-dialog-title'>Login</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter your username and password
              </DialogContentText>
              <TextField
                autoFocus
                error={incorrectUsername}
                margin='dense'
                id='name'
                label='Username'
                type='text'
                fullWidth
                onChange={editUsername}
                helperText={incorrectUsername ? "Username does not exist" : ""}
              />
              <TextField
                error={incorrectPassword}
                autoFocus
                margin='dense'
                id='name'
                label='Password'
                type='password'
                fullWidth
                onChange={editPassword}
                helpertext={
                  incorrectPassword
                    ? "Incorrect Password for given username"
                    : ""
                }
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button type='submit' color='primary'>
                Login
              </Button>
              <Button onClick={handleCreate} color='primary'>
                Create new
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <CreateAccount open={isCreate} action={handleCreate} />
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    profAuthenticated: state.auth.profAuthenticated
  };
};

export default connect(mapStateToProps, { addProf })(Landing);
