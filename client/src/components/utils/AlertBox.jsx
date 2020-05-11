import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const AlertBox = (props) => {
  return (
    <Snackbar
      open={props.AlertMsg.status}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      onClose={props.handleClose}
    >
      <Alert color={props.AlertMsg.type}>{props.AlertMsg.msg}</Alert>
    </Snackbar>
  );
};

AlertBox.propTypes = {
  AlertMsg: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AlertBox;
