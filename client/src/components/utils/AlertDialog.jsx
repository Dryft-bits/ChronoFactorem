import React from "react";
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { closeAlertDialog } from "../../redux/actions/dialogs.js";
import { nullifyId } from "../../redux/actions/UpdateTimeTable";
import Button from '@material-ui/core/Button';

const AlertDialog = (props) => {
  const [data, setData] = React.useState({
    input: null,
  });
  const { input } = data;

  function getName(e) {
    setData({ input: e.target.value });
  }

  return (
    <div>
      <Dialog
        open={props.status}
        onClose={() => {
          props.closeAlertDialog(null, null);
        }}
        disableEscapeKeyDown={
          props.type === "form" || props.type === "confirm" ? true : false
        }
        disableBackdropClick={
          props.type === "form" || props.type === "confirm" ? true : false
        }
      >
        <DialogTitle>{props.msg}</DialogTitle>
        {props.type === "form" ? (
          <>
            <DialogContent>
            <ScopedCssBaseline>
              {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Timetable Name"
              fullWidth
              onChange={(e) => {
                getName(e);
              }}
              /> */}
              <input
                type='text'
                style={{ color: "black" }}
                placeholder='Timetable Name'
                onChange={(e) => {
                  getName(e);
                }}
              ></input>
            </ScopedCssBaseline>
            </DialogContent>
          </>
        ) : null}
        {props.type === "form" || props.type === "confirm" ? (
          <DialogActions>
            <Button
              variant='contained'
              size='small'
              color='primary'
              onClick={() => {
                if (props.next.todo !== undefined) {
                  props.nullifyId();
                }
                props.closeAlertDialog(props.next.success, input);
              }}
            >
              Yes
            </Button>
            <Button
              variant='contained'
              size='small'
              color='secondary'
              onClick={() => {
                props.closeAlertDialog(props.next.fail, null);
              }}
            >
              No
            </Button>
            <Button
              variant='contained'
              size='small'
              onClick={() => {
                props.closeAlertDialog("cancel", null);
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        ) : null}
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    status: state.dialog.alertDialog.status,
    msg: state.dialog.alertDialog.msg,
    type: state.dialog.alertDialog.type,
    next: state.dialog.next,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeAlertDialog: (next, input) => dispatch(closeAlertDialog(next, input)),
    nullifyId: () => dispatch(nullifyId()),
  };
};

AlertDialog.propTypes = {
  status: PropTypes.bool.isRequired,
  msg: PropTypes.string,
  closeAlertDialog: PropTypes.func.isRequired,
  nullifyId: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);
