import axios from "axios";
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "./types";

export const verifyLogin = () => async dispatch => {
  try {
    const res = await axios.get("/api/loggedin");
    if (res.status === 200 && res.data.name) {
      return new Promise((resolve, _) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });

        resolve();
      });
    } else {
      return new Promise((resolve, _) => {
        dispatch({
          type: LOGIN_FAILURE
        });

        resolve();
      });
    }
  } catch (err) {
    return new Promise((resolve, _) => {
      dispatch({
        type: LOGIN_FAILURE
      });

      resolve();
    });
  }
};

export const logout = () => async dispatch => {
  await axios.get("/api/logout");
  return new Promise((resolve, _) => {
    dispatch({
      type: LOGOUT
    });

    resolve();
  });
};
