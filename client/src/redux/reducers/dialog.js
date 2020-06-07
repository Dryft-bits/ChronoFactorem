import { OPEN_ALERT_DIALOG, CLOSE_ALERT_DIALOG } from "../actions/types";

const initialState = {
  alertDialog: { msg: null, status: false },
};

export default function dialogReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_ALERT_DIALOG:
      return {
        ...state,
        alertDialog: { msg: action.payload.msg, status: true },
      };
    case CLOSE_ALERT_DIALOG:
      return {
        ...state,
        alertDialog: { msg: null, status: false },
      };
    default:
      return state;
  }
}
