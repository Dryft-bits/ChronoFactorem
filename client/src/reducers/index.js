import { combineReducers } from "redux";
import updateTTReducer from "./UpdateTimeTable";
import updateCCReducer from "./UpdateCurentCourse";
import helFormReducer from "./helForm";
import authReducer from "./auth";

/* Add reducers here */
export default combineReducers({
  updateTT: updateTTReducer,
  updateCC: updateCCReducer,
  helForm: helFormReducer,
  auth: authReducer
});
