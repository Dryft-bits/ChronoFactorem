import axios from "axios";
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  USER_LOADED,
  NO_USER
} from "./types";

import { history } from "../App";

export const verifyLogin = () => async dispatch => {
  try {
    const res = await axios.get("/api/loggedin");
    if (res.status === 200 && res.data.name) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: LOGIN_FAILURE
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAILURE
    });
  }
};

export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get("/api/loggedin");
    if (res.status === 200 && res.data.name) {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } else {
      dispatch({
        type: NO_USER
      });
    }
  } catch (err) {
    dispatch({
      type: NO_USER
    });
  }
};

export const logout = () => async dispatch => {
  if (
    !window.confirm("All your unsaved progress will be lost once you logout!")
  ) {
    return;
  }
  await axios
    .get("/api/logout")
    .then(() => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .then(() => {
      history.push("/");
    })
    .catch(err => {
      // TODO: Can choose to pass error and show alert. For when alerts are implemented.
      // dispatch({ type: 'LOGOUT_FAILURE', err});
      dispatch({ type: LOGOUT_FAILURE });
    });
};
