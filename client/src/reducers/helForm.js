import { SUBMIT_SUCCESS, SUBMIT_FAIL } from "../actions/types";

const initialState = {
  loading: true,
  submitted: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SUBMIT_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
        submitted: true
      };

    case SUBMIT_FAIL:
      return {
        ...state,
        loading: false,
        submitted: false
      };

    default:
      return state;
  }
}
