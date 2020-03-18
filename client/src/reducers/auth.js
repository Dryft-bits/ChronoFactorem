import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "../actions/types";

const initialState = {
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };

    case LOGOUT:
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null
      };

    default:
      return state;
  }
}
