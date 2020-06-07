import { OPEN_ALERT_DIALOG, CLOSE_ALERT_DIALOG } from "./types";

export const openAlertDialog = (msg) => {
  return {
    type: OPEN_ALERT_DIALOG,
    payload: { msg: msg },
  };
};

export const closeAlertDialog = () => {
  return {
    type: CLOSE_ALERT_DIALOG,
  };
};
