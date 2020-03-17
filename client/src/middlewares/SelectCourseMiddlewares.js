import { UPDATE_CURRENT_COURSE } from "../actions/types";

export const getSelectedCourseMiddleware = () => next => action => {
  if (action.type === UPDATE_CURRENT_COURSE) {
    let selectCourse = obj =>
      Object.keys(obj)
        .filter(course => course === action.payload.course)
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
    action.payload.course = selectCourse(action.payload.currentCourses);
  }
  return next(action);
};
