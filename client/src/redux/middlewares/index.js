import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { getSelectedCourseMiddleware } from "./SelectCourseMiddlewares";
import { closeDialogMiddleware } from "./dialog";
import thunk from "redux-thunk";

import {
  checkSectionSwapMiddleware,
  checkClashOrDeleteMiddleWare,
  checkLunchHourMiddleware,
  addSectionMiddleware,
  deleteSectionMiddleware,
  saveTTMiddleware,
} from "./ValidateTTMiddlewares";

export const customMiddleware = composeWithDevTools(
  applyMiddleware(
    getSelectedCourseMiddleware,
    checkClashOrDeleteMiddleWare,
    checkSectionSwapMiddleware,
    checkLunchHourMiddleware,
    addSectionMiddleware,
    deleteSectionMiddleware,
    saveTTMiddleware,
    closeDialogMiddleware,
    thunk
  )
);
