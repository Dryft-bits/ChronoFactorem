import { CLOSE_ALERT_DIALOG } from "../actions/types";
import { closeAlertDialog, openAlertDialog } from "../actions/dialogs";
import { saveTimeTable } from "../actions/UpdateTimeTable";

export const closeDialogMiddleware = (store) => (next) => (action) => {
  if (action.type === CLOSE_ALERT_DIALOG) {
    if (action.payload.next === "newName") {
      store.dispatch(
        openAlertDialog(
          "Would You like to give Your TimeTable a Name?",
          "form",
          "save"
        )
      );
      return;
    } else if (action.payload.next === "updateName") {
      store.dispatch(
        openAlertDialog(
          "Would You like to Update the name of the TimeTable?",
          "form",
          "save"
        )
      );
      return;
    } else if (action.payload.next === "save") {
      store.dispatch(saveTimeTable(action.payload.input));
    } else {
      store.dispatch(closeAlertDialog(null, null));
    }
  }
  return next(action);
};
