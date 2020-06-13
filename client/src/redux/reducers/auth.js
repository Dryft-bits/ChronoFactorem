import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_INFO,
  LOGOUT_FAILURE,
  USER_LOADED,
  NO_USER,
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload
      };

    case UPDATE_INFO:
      return {
        ...state,
        user: { ...state.user, branch: payload.branch, year: payload.year }
      };

    case NO_USER:
    case LOGOUT_SUCCESS:
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };



    case LOGOUT_FAILURE:
    default:
      return state;


  }
}
