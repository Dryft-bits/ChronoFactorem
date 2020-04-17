import React from "react";
import Select from "react-select";
import ListCourse from "./ListCourse.jsx";
import * as TimeTableData from "../../Timetable.json";

const course = JSON.parse(JSON.stringify(TimeTableData)).default;
const hours = [
  { value: null, label: "None" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
];
const days = [
  { value: null, label: "None" },
  { value: "M", label: "M W F" },
  { value: "T", label: "T Th S" },
];

let selectedDay = null;
let selectedHour = null;

let humCourses = Object.keys(course)
  .filter(
    (code) =>
      code.startsWith("GS") ||
      code.startsWith("HSS") ||
      code.startsWith("BITS F214") ||
      code.startsWith("BITS F385") ||
      code.startsWith("BITS F399")
  )
  .reduce((res, key) => ((res[key] = course[key]), res), {});

const SearchHel = () => {
  const [searchResults, setSearchResults] = React.useState({
    initial: humCourses,
    current: humCourses,
  });
  const { initial, current } = searchResults;

  function filterItems() {
    console.log(selectedDay, selectedHour);
    let removeCourses = (obj) =>
      Object.keys(obj)
        .filter((item) => obj[item]["sections"]["L1"].sched.length)
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
    let filterCourses = (obj) =>
      Object.keys(obj)
        .filter((item) =>
          selectedHour
            ? selectedDay
              ? selectedDay ===
                  obj[item]["sections"]["L1"]["sched"][0].days[0] &&
                selectedHour ===
                  obj[item]["sections"]["L1"]["sched"][0].hours[0]
              : selectedHour ===
                obj[item]["sections"]["L1"]["sched"][0].hours[0]
            : selectedDay
            ? selectedDay === obj[item]["sections"]["L1"]["sched"][0].days[0]
            : true
        )
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
    let filteredlist = removeCourses(searchResults.initial);
    let updatedlist = filterCourses(filteredlist);
    setSearchResults({ ...searchResults, current: updatedlist });
  }

  return (
    <>
      <Select
        onChange={(input) => {
          selectedDay = input.value;
          filterItems();
        }}
        options={days}
      />
      <Select
        onChange={(input) => {
          selectedHour = input.value;
          filterItems();
        }}
        options={hours}
      />
      <ListCourse courses={searchResults.current} />
    </>
  );
};

export default SearchHel;
