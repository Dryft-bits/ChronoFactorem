import { ADD_SECTION, DELETE_SECTION, CLEAR_ALL } from "./types";
import store from "../store";

export const addSection = section => {
  return {
    type: ADD_SECTION,
    payload: {
      section: section,
      timetable: store.getState().updateTT.myTimeTable,
      courses: store.getState().updateTT.myCourses
    }
  };
};

export const deleteSection = (
  section,
  timetable = store.getState().updateTT.myTimeTable,
  courses = store.getState().updateTT.myCourses
) => {
  return {
    type: DELETE_SECTION,
    payload: {
      section: section,
      timetable: timetable,
      courses: courses
    }
  };
};

export const clearAll = () => {
  return {
    type: CLEAR_ALL
  };
};
