import { SUBMIT_SUCCESS, SUBMIT_FAIL } from '../actions/types';

const initialState = {
  submitted: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SUBMIT_SUCCESS:
      return {
        ...state,
        ...payload,
        submitted: true
      };

    case SUBMIT_FAIL:
      return {
        ...state,
        submitted: false
      };

    default:
      return state;
  }
}
