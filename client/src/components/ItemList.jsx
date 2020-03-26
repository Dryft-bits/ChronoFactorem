import React from "react";
import PropTypes from "prop-types";

const ItemList = props => {
  return (
    <ul className="courseSearch">
      {Object.keys(props.items).map(item => {
        return (
          <div
            className="courseItem"
            key={item}
            id={item}
            onClick={props.action}
          >
            {item} {props.items[item]["name"]}
          </div>
        );
      })}
    </ul>
  );
};

ItemList.propTypes = {
  items: PropTypes.object.isRequired
};

export default ItemList;
