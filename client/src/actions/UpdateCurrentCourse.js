import { UPDATE_CURRENT_COURSE, CLEAR_CURRENT_COURSE } from './types';

export const updateCurrentCourse = (course, currentCourses) => {
  return {
    type: UPDATE_CURRENT_COURSE,
    payload: { course: course, currentCourses: currentCourses }
  };
};

export const clearCurrentCourse = () => {
  return {
    type: CLEAR_CURRENT_COURSE
  };
};
