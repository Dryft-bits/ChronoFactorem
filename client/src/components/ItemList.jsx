import React from "react";
const ItemList = props => {
  return (
    <ul className='courseSearch'>
      {Object.keys(props.items).map(item => {
        return (
          <div
            className='courseItem'
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

export default ItemList;
