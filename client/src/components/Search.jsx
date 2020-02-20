import React from "react";

const Search = props => {
  return (
    <div>
      <input type="text" onChange={props.action} />
    </div>
  );
};

export default Search;
