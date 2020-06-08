import { OPEN_ALERT_DIALOG, CLOSE_ALERT_DIALOG } from "./types";

export const openAlertDialog = (msg, type, next) => {
  return {
    type: OPEN_ALERT_DIALOG,
    payload: { msg: msg, type: type, next: next },
  };
};

export const closeAlertDialog = (next) => {
  return {
    type: CLOSE_ALERT_DIALOG,
    payload: {
      next: next,
    },
  };
};
