import { UPDATE_CURRENT_COURSE, CLEAR_CURRENT_COURSE } from '../actions/types';

const initialState = {
  currentCourse: null
};

export default function updateCCReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CURRENT_COURSE:
      return {
        ...state,
        currentCourse: action.payload.course
      };
    case CLEAR_CURRENT_COURSE:
      return {
        currentCourse: null
      };
    default:
      return state;
  }
}
