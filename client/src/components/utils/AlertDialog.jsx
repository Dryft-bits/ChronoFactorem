import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { closeAlertDialog } from "../../redux/actions/dialogs.js";

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
            <input
              type='text'
              style={{ color: "black" }}
              placeholder='Enter name here'
              onChange={(e) => {
                getName(e);
              }}
            ></input>
          </>
        ) : null}
        {props.type === "form" || props.type === "confirm" ? (
          <div align='right'>
            <button
              onClick={() => {
                props.closeAlertDialog(props.next.success, input);
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                props.closeAlertDialog(props.next.fail, null);
              }}
            >
              NO
            </button>
            <button
              onClick={() => {
                props.closeAlertDialog("cancel", null);
              }}
            >
              Cancel Saving
            </button>
          </div>
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
  };
};

AlertDialog.propTypes = {
  status: PropTypes.bool.isRequired,
  msg: PropTypes.string,
  closeAlertDialog: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);
