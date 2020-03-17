/*** Redux setup
 * Create redux store
 */

import { createStore } from "redux";
import { customMiddleware } from "./middlewares/index";
//import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

//const middleWare = [thunk];

const store = createStore(rootReducer, initialState, customMiddleware);

export default store;
