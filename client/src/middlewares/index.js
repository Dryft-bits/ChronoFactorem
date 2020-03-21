import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { getSelectedCourseMiddleware } from "./SelectCourseMiddlewares";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

import {
  checkSectionSwapMiddleware,
  checkClashOrDeleteMiddleWare,
  checkLunchHourMiddleware,
  addSectionMiddleware
} from "./ValidateTTMiddlewares";

export const customMiddleware = composeWithDevTools(
  applyMiddleware(
    getSelectedCourseMiddleware,
    checkClashOrDeleteMiddleWare,
    checkSectionSwapMiddleware,
    checkLunchHourMiddleware,
    addSectionMiddleware,
    thunk
  )
);
