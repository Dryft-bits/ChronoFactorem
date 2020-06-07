import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { closeSaveAlert } from "../../redux/actions/UpdateTimeTable";

const AlertBox = (props) => {
  return (
    <Snackbar
      open={props.alertMsg.status}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      onClose={props.handleClose}
    >
      <Alert color={props.alertMsg.type}>{props.alertMsg.msg}</Alert>
    </Snackbar>
  );
};

const mapStateToProps = (state) => {
  return {
    alertMsg: state.updateTT.alertMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleClose: () => dispatch(closeSaveAlert()),
  };
};

AlertBox.propTypes = {
  alertMsg: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertBox);
