import { ADD_SECTION } from "../actions/types";
import { deleteSection } from "../actions/UpdateTimeTable";
import * as utils from "../utils/CreateTTUtils.js";

let courseCode, temp, courseTemp, sectionDict;

function getDetails(store) {
  let courseCode = Object.keys(store.getState().updateCC.currentCourse);
  let temp = store.getState().updateTT.myTimeTable;
  let courseTemp = store.getState().updateTT.myCourses;
  let sectionDict = store.getState().updateCC.currentCourse[courseCode]
    .sections;
  return [courseCode, temp, courseTemp, sectionDict];
}

export const checkSectionSwapMiddleware = store => next => action => {
  if (action.type === ADD_SECTION) {
    [courseCode, temp, courseTemp, sectionDict] = getDetails(store);
    let section = action.payload.section;
    let duplicate = utils.checkSection(courseTemp, courseCode, section);
    if (
      duplicate &&
      !window.confirm(
        "You have already chosen a " +
          utils.mapSection[section.charAt(0)] +
          " for this course.Click ok to swap it with the selected section"
      )
    ) {
      return;
    } else if (duplicate) {
      [temp, courseTemp] = utils.deleteSection(
        temp,
        courseTemp,
        courseCode,
        sectionDict,
        duplicate
      );
      store.dispatch(deleteSection(duplicate, temp, courseTemp));
    }
  }
  return next(action);
};

export const checkClashOrDeleteMiddleWare = store => next => action => {
  if (action.type === ADD_SECTION) {
    [courseCode, temp, courseTemp, sectionDict] = getDetails(store);
    let clash = false;
    let section = action.payload.section;
    sectionDict[section].sched.forEach(item => {
      clash =
        clash ||
        utils.checkClashOrDelete(
          temp,
          courseCode,
          utils.getSectionDetails(item)
        );
    });
    if (clash && clash !== "delete") {
      window.alert(
        "The selected section clashes with an already present course section! Please remove the previous course first!"
      );
      return;
    } else if (clash === "delete") {
      if (
        !window.confirm("Are You Sure That You Want To delete this Section?")
      ) {
        return;
      } else {
        [temp, courseTemp] = utils.deleteSection(
          temp,
          courseTemp,
          courseCode,
          sectionDict,
          section
        );
        return store.dispatch(deleteSection(section, temp, courseTemp));
      }
    }
  }
  return next(action);
};

export const checkLunchHourMiddleware = store => next => action => {
  if (action.type === ADD_SECTION) {
    [courseCode, temp, courseTemp, sectionDict] = getDetails(store);
    let section = action.payload.section;
    let checkLunch = false;
    sectionDict[section].sched.forEach(item => {
      checkLunch =
        checkLunch || utils.checkLunchHour(temp, utils.getSectionDetails(item));
    });
    if (
      checkLunch &&
      !window.confirm(
        "Upon chosing this section you are not left with any lunch hour on " +
          utils.mapDay[checkLunch] +
          " Click ok to proceed anyway"
      )
    ) {
      return;
    }
  }
  return next(action);
};

export const addSectionMiddleware = store => next => action => {
  if (action.type === ADD_SECTION) {
    let section = action.payload.section;
    [courseCode, temp, courseTemp, sectionDict] = getDetails(store);
    [temp, courseTemp] = utils.updateTT(
      temp,
      courseTemp,
      courseCode,
      store.getState().updateCC.currentCourse,
      sectionDict,
      section
    );
    action.payload.TimeTable = temp;
    action.payload.courses = courseTemp;
  }
  return next(action);
};
