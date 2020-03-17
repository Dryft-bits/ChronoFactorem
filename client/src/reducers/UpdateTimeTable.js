import TimeTable from "../schemas/TimeTable.js";
import { ADD_SECTION, DELETE_SECTION, CLEAR_ALL } from "../actions/types";

let timetable, courses;

const initialState = {
  myTimeTable: new TimeTable(),
  myCourses: []
};

export default function updateTTReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SECTION:
      timetable = Object.assign({}, action.payload.timetable);
      courses = [...action.payload.courses];
      return {
        ...state,
        myTimeTable: timetable,
        myCourses: courses
      };
    case DELETE_SECTION:
      timetable = Object.assign({}, action.payload.timetable);
      courses = [...action.payload.courses];
      return {
        ...state,
        myTimeTable: timetable,
        myCourses: courses
      };
    case CLEAR_ALL:
      return {
        ...state,
        myTimeTable: new TimeTable(),
        myCourses: []
      };
    default:
      return state;
  }
}
