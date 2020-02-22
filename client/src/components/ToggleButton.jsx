import React from "react";

const ToggleButton = props => {
  return (
    <div>
      <button class="purple waves-effect waves-light btn" name={props.title} onClick={props.action}>
        {props.title}
      </button>
    </div>
  );
};

export default ToggleButton;
