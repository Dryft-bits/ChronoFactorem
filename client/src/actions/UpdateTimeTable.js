import {
  ADD_SECTION,
  DELETE_SECTION,
  CLEAR_ALL,
  SAVE_TIMETABLE,
  TIMETABLE_LOADING,
  EDIT_TIMETABLE
} from "./types";
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
  courseCode,
  timetable = store.getState().updateTT.myTimeTable,
  courses = store.getState().updateTT.myCourses,
  remove = true
) => {
  return {
    type: DELETE_SECTION,
    payload: {
      section: section,
      courseCode: courseCode,
      timetable: timetable,
      courses: courses,
      remove: remove
    }
  };
};

export const clearAll = () => {
  return {
    type: CLEAR_ALL
  };
};

export const saveTimeTable = () => {
  return {
    type: SAVE_TIMETABLE,
    payload: {
      id: store.getState().id,
      name: store.getState().name
    }
  };
};

export const editTT = (tt, sharedTT = false) => {
  let id = sharedTT ? null : tt._id;
  return {
    type: EDIT_TIMETABLE,
    payload: {
      id: id,
      name: tt.name,
      timetable: tt.TimeTable,
      courses: tt.Courses
    }
  };
};

export const setTimeTableLoading = () => {
  return {
    type: TIMETABLE_LOADING
  };
};
