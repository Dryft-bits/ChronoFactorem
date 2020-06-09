import {
  ADD_SECTION,
  DELETE_SECTION,
  CLEAR_ALL,
  SAVE_TIMETABLE,
  EDIT_TIMETABLE,
  NULLIFY_ID,
} from "./types";
import store from "../store";

export const addSection = (section) => {
  return {
    type: ADD_SECTION,
    payload: {
      section: section,
      timetable: store.getState().updateTT.myTimeTable,
      courses: store.getState().updateTT.myCourses,
    },
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
      remove: remove,
    },
  };
};

export const clearAll = () => {
  return {
    type: CLEAR_ALL,
  };
};

export const saveTimeTable = (name) => {
  if (name === null) {
    name = store.getState().updateTT.name;
  }
  console.log(name);
  return {
    type: SAVE_TIMETABLE,
    payload: {
      id: store.getState().id,
      name: name,
    },
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
      courses: tt.Courses,
    },
  };
};

export const nullifyId = () => {
  return {
    type: NULLIFY_ID,
  };
};
