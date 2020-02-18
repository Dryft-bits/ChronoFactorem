import React, { Fragment } from "react";
import SearchCourse from "./SearchCourse";
import TimetablePreview from "../timetable/TimetablePreview.jsx";

const Testbed = () => {
  return (
    <Fragment>
      <SearchCourse></SearchCourse>
      <TimetablePreview></TimetablePreview>
    </Fragment>
  );
};

export default Testbed;
