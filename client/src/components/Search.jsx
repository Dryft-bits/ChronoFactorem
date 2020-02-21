import React from "react";

const Search = props => {
  return (
    <div>
      <input type="text" placeholder="Search Course" onChange={props.action} />
    </div>
  );
};

export default Search;
