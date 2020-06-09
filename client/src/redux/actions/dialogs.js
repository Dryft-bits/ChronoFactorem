import {
  OPEN_ALERT_DIALOG,
  CLOSE_ALERT_DIALOG,
  OPEN_SAVE_ALERT,
  CLOSE_SAVE_ALERT,
} from "./types";

export const openSaveAlert = (msg, type) => {
  return {
    type: OPEN_SAVE_ALERT,
    payload: {
      msg: msg,
      type: type,
    },
  };
};

export const closeSaveAlert = () => {
  return {
    type: CLOSE_SAVE_ALERT,
  };
};

export const openAlertDialog = (msg, type, next) => {
  return {
    type: OPEN_ALERT_DIALOG,
    payload: { msg: msg, type: type, next: next },
  };
};

export const closeAlertDialog = (next, input) => {
  return {
    type: CLOSE_ALERT_DIALOG,
    payload: {
      next: next,
      input: input,
    },
  };
};
