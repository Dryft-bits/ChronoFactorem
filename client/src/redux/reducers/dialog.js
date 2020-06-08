import { OPEN_ALERT_DIALOG, CLOSE_ALERT_DIALOG } from "../actions/types";

const initialState = {
  alertDialog: { msg: null, status: false, type: null },
  next: null,
};

export default function dialogReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_ALERT_DIALOG:
      return {
        ...state,
        alertDialog: {
          msg: action.payload.msg,
          status: true,
          type: action.payload.type,
        },
        next: action.payload.next,
      };
    case CLOSE_ALERT_DIALOG:
      return {
        ...state,
        alertDialog: { msg: null, status: false, buttons: null },
      };
    default:
      return state;
  }
}
