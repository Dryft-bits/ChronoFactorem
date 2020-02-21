import React, { Fragment } from "react";
import TimetableManager from "../timetable/TimetableManager.jsx";

import axios from "axios";

const getName = () => {
  var name = [];
  axios
    .get("/api/current_user")
    .then(function(response) {
      name.push(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
  return name;
};

// Define layout of page student sees after logging in
const StudentLayout = () => {
  const name = getName();
  return (
    <Fragment>
      <TimetableManager></TimetableManager>
      <a href='http://localhost:5000/api/logout'>Logout</a>
    </Fragment>
  );
};

export default StudentLayout;
