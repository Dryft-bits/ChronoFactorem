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
const bcrypt = require('bcryptjs');


export const Landing = ({ isAuthenticated }) => {

  const [open, setOpen] = useState({
    isOpen: false,
    username: "",
    password: "",
    incorrectUsername: false,
    incorrectPassword: false,
    profAuthenticated: false
  });
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
  const submit = (e) => {
    let iu = true, ip = false;
    e.preventDefault();
    axios.get("/api/ProfAuth", {
      username: open.username
    }).then(
      (res, err) => {
        if (err) {
          console.log(err);
        }
        if (res === null || res.token.password === undefined) {
          iu = false;
        }
        else if (bcrypt.compareSync(open.password, res.token.password) === true) {
          iu = true
          ip = true;
          open.profAuthenticated = true;
          localStorage.setItem(res.token.username,res.token);
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

  if (open.profAuthenticated) {
    return;//return to dashboard here
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
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
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
                helperText={open.incorrectUsername?"Username does not exist":""}
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
                helperText={open.incorrectPassword?"Incorrect Password for given username":""}
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
          </Button>
              <Button type='submit' color="primary">
                Login
          </Button>
            </DialogActions>
          </form>
        </Dialog>

      </div>
    </section>);

};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps, null)(Landing);
