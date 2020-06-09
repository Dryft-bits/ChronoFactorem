import {
  OPEN_ALERT_DIALOG,
  CLOSE_ALERT_DIALOG,
  OPEN_SAVE_ALERT,
  CLOSE_SAVE_ALERT,
} from "../actions/types";

const initialState = {
  alertDialog: { msg: null, status: false, type: null },
  next: null,
  alertMsg: { msg: null, status: false, type: null },
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
    case OPEN_SAVE_ALERT:
      return {
        ...state,
        alertMsg: {
          msg: action.payload.msg,
          type: action.payload.type,
          status: true,
        },
      };
    case CLOSE_SAVE_ALERT:
      return {
        ...state,
        alertMsg: {
          msg: null,
          type: null,
          status: false,
        },
      };
    default:
      return state;
  }
}
