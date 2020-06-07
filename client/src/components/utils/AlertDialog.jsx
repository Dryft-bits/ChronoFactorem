import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { closeAlertDialog } from "../../redux/actions/dialogs.js";

const AlertDialog = (props) => {
  return (
    <div>
      <Dialog
        open={props.status}
        onClose={() => {
          props.closeAlertDialog();
        }}
      >
        <DialogTitle>{props.msg}</DialogTitle>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    status: state.dialog.alertDialog.status,
    msg: state.dialog.alertDialog.msg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeAlertDialog: () => dispatch(closeAlertDialog()),
  };
};

AlertDialog.propTypes = {
  status: PropTypes.bool.isRequired,
  msg: PropTypes.string.isRequired,
  closeAlertDialog: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);
