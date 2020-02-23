import React from "react";
import "../styles/Timetable.css"
const Search = props => {
  return (
    <div className="input-field">
      <input type="text" placeholder="Search Course" onChange={props.action} />
    </div>
  );
};

export default Search;
