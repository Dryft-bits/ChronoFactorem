import { combineReducers } from "redux";
import updateTTReducer from "./UpdateTimeTable";
import updateCCReducer from "./UpdateCurentCourse";

/* Add reducers here */
export default combineReducers({
  updateTT: updateTTReducer,
  updateCC: updateCCReducer
});
