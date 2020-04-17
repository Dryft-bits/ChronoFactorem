import axios from "axios";
import { ADD_SECTION, SAVE_TIMETABLE, DELETE_SECTION } from "../actions/types";
import { deleteSection, setTimeTableLoading } from "../actions/UpdateTimeTable";
import * as utils from "../utils/CreateTTUtils.js";
import * as TimeTableData from "../Timetable.json";

const courses = JSON.parse(JSON.stringify(TimeTableData));
let courseCode, temp, courseTemp, sectionDict;

function getDetails(store, remove = false) {
  if (remove) {
    sectionDict = courses.default[courseCode].sections;
  } else {
    courseCode = Object.keys(store.getState().updateCC.currentCourse);
    sectionDict = store.getState().updateCC.currentCourse[courseCode].sections;
  }
  let temp = store.getState().updateTT.myTimeTable;
  let courseTemp = store.getState().updateTT.myCourses;

  return [courseCode, temp, courseTemp, sectionDict];
}

export const checkSectionSwapMiddleware = (store) => (next) => (action) => {
  if (action.type === ADD_SECTION) {
    [courseCode, temp, courseTemp, sectionDict] = getDetails(store);
    let section = action.payload.section;
    let duplicate = utils.checkSection(courseTemp, courseCode, section);
    if (duplicate === "same section") {
      window.alert("You have already chosen this Section!");
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
      window.alert(
        "The selected section clashes with an already present course section! Please remove the previous course first!"
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
    let ttname;
    let id = store.getState().updateTT.id;
    if (
      id &&
      window.confirm(
        "Click on ok to save as new TimeTable or on cancel to update this one!"
      )
    ) {
      id = null;
    }
    if (id) {
      ttname =
        prompt("Would you like to change the name of the timetable?") ||
        store.getState().updateTT.name;
    } else {
      ttname = prompt("Would you like to give the timetable a name?");
    }
    store.dispatch(setTimeTableLoading());
    try {
      axios
        .post("/api/timetable/save", {
          id: id,
          name: ttname,
          timetable: store.getState().updateTT.myTimeTable,
          courses: store.getState().updateTT.myCourses
        })
        .then((res) => {
          if (res.status !== 200) {
            throw Error("Couldn't Save The TimeTable! Please Try Again Later.");
          }
          action.payload.id = res.data.id;
          action.payload.name = ttname;
          action.payload.timetable = store.getState().updateTT.myTimeTable;
          window.alert("Successfully Saved the TimeTable");
          return next(action);
        });
    } catch (err) {
      window.alert(err.message);
      return;
    }
  } else {
    return next(action);
  }
};
