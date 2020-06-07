import TimeTable from "../../schemas/TimeTable.js";
import {
  ADD_SECTION,
  DELETE_SECTION,
  CLEAR_ALL,
  EDIT_TIMETABLE,
  SAVE_TIMETABLE,
  OPEN_SAVE_ALERT,
  CLOSE_SAVE_ALERT,
} from "../actions/types";

let timetable, courses;

const initialState = {
  id: null,
  name: null,
  myTimeTable: new TimeTable(),
  myCourses: [],
  alertMsg: { msg: null, tyoe: null, status: false },
};

export default function updateTTReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SECTION:
      timetable = Object.assign({}, action.payload.timetable);
      courses = [...action.payload.courses];
      return {
        ...state,
        myTimeTable: timetable,
        myCourses: courses,
      };
    case DELETE_SECTION:
      timetable = Object.assign({}, action.payload.timetable);
      courses = [...action.payload.courses];
      return {
        ...state,
        myTimeTable: timetable,
        myCourses: courses,
      };
    case CLEAR_ALL:
      return {
        ...state,
        myTimeTable: new TimeTable(),
        myCourses: [],
      };
    case EDIT_TIMETABLE:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        myTimeTable: action.payload.timetable,
        myCourses: action.payload.courses,
      };
    case SAVE_TIMETABLE:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
      };
    case OPEN_SAVE_ALERT:
      return {
        ...state,
        alertMsg: {
          msg: action.payload.msg,
          type: action.payload.type,
          status: true,
        },
      };
    case CLOSE_SAVE_ALERT:
      return {
        ...state,
        alertMsg: {
          msg: null,
          type: null,
          status: false,
        },
      };
    default:
      return state;
  }
}
