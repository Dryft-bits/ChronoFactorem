import axios from "axios";
import { ADD_SECTION, SAVE_TIMETABLE, DELETE_SECTION } from "../actions/types";
import { deleteSection } from "../actions/UpdateTimeTable";
import { openAlertDialog, openSaveAlert } from "../actions/dialogs";
import * as utils from "../../utils/CreateTTUtils.js";
import * as TimeTableData from "../../Timetable.json";

const courses = JSON.parse(JSON.stringify(TimeTableData));
let courseCode, temp, courseTemp, sectionDict;

function getDetails(store, remove = false) {
  if (remove) {
    sectionDict = courses.default[courseCode].sections;
  } else {
    courseCode = Object.keys(store.getState().updateCC.currentCourse);
    sectionDict = store.getState().updateCC.currentCourse[courseCode].sections;
  }
  temp = store.getState().updateTT.myTimeTable;
  courseTemp = store.getState().updateTT.myCourses;

  return [courseCode, temp, courseTemp, sectionDict];
}

export const checkSectionSwapMiddleware = (store) => (next) => (action) => {
  if (action.type === ADD_SECTION) {
    [courseCode, temp, courseTemp, sectionDict] = getDetails(store);
    let section = action.payload.section;
    let duplicate = utils.checkSection(courseTemp, courseCode, section);
    if (duplicate === "same section") {
      store.dispatch(
        openAlertDialog("You have already chosen this Section!", null, null)
      );
      return;
    } else if (
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
      store.dispatch(
        deleteSection(duplicate, courseCode, temp, courseTemp, false)
      );
    }
  }
  return next(action);
};

export const checkClashOrDeleteMiddleWare = (store) => (next) => (action) => {
  if (action.type === ADD_SECTION) {
    [courseCode, temp, courseTemp, sectionDict] = getDetails(store);
    let clash = false;
    let section = action.payload.section;
    sectionDict[section].sched.forEach((item) => {
      clash =
        clash ||
        utils.checkClashOrDelete(
          temp,
          courseCode,
          utils.getSectionDetails(item)
        );
    });
    if (clash) {
      store.dispatch(
        openAlertDialog(
          "The selected section clashes with an already present course section! Please remove the previous course first!",
          null,
          null
        )
      );
      return;
    }
  }
  return next(action);
};

export const checkLunchHourMiddleware = (store) => (next) => (action) => {
  if (action.type === ADD_SECTION) {
    [courseCode, temp, courseTemp, sectionDict] = getDetails(store);
    let section = action.payload.section;
    let checkLunch = false;
    sectionDict[section].sched.forEach((item) => {
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

export const addSectionMiddleware = (store) => (next) => (action) => {
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

export const deleteSectionMiddleware = (store) => (next) => (action) => {
  if (action.type === DELETE_SECTION) {
    if (action.payload.remove) {
      if (!window.confirm("Are You Sure That You Want To delete this Section?"))
        return;
    }
    let section = action.payload.section;
    courseCode = action.payload.courseCode;
    [, temp, courseTemp, sectionDict] = getDetails(store, true);
    [temp, courseTemp] = utils.deleteSection(
      temp,
      courseTemp,
      courseCode,
      sectionDict,
      section
    );
    action.payload.TimeTable = temp;
    action.payload.courses = courseTemp;
  }
  return next(action);
};

export const saveTTMiddleware = (store) => (next) => (action) => {
  if (action.type === SAVE_TIMETABLE) {
    let ttname = action.payload.name;
    let id = store.getState().updateTT.id;
    try {
      axios
        .post("/api/timetable/save", {
          id: id,
          name: ttname,
          timetable: store.getState().updateTT.myTimeTable,
          courses: store.getState().updateTT.myCourses,
        })
        .then((res) => {
          if (res.status !== 200) {
            throw Error("Couldn't Save The TimeTable! Please Try Again Later.");
          }
          action.payload.id = res.data.id;
          store.dispatch(
            openSaveAlert("Successfully Saved the TimeTable", "success")
          );
          return next(action);
        });
    } catch (err) {
      store.dispatch(openSaveAlert(err.message, "error"));
      return;
    }
  } else {
    return next(action);
  }
};
