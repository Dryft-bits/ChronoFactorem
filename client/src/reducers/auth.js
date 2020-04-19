import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_INFO,
  LOGOUT_FAILURE,
  USER_LOADED,
  NO_USER,
  PROF_LOADED,
  NO_PROF,
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  isProfAuthenticated: null,
  user: null,
  prof: null
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
    case NO_PROF:
    case LOGOUT_SUCCESS:
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        profAuthenticated: false,
        prof: null
      };

    case PROF_LOADED:
      return {
        ...state,
        isProfAuthenticated: true,
        prof: payload
      };

    case LOGOUT_FAILURE:
    default:
      return state;

    
  }
}
