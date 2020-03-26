import React from "react";
import PropTypes from "prop-types";

const ToggleButton = props => {
  return (
    <div>
      <button
        className="waves-effect waves-light btn"
        name={props.title}
        onClick={props.action}
      >
        {props.title}
      </button>
    </div>
  );
};

ToggleButton.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func.isRequired
};

export default ToggleButton;
