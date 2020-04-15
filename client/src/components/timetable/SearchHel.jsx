import React from "react";
import Select from "react-select";
import ListCourse from "./ListCourse.jsx";
import * as TimeTableData from "../../Timetable.json";

const course = JSON.parse(JSON.stringify(TimeTableData)).default;
const hours = [
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
  { value: "M", label: "M W F" },
  { value: "T", label: "T Th S" },
];

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

const SearchHel = (props) => {
  const [searchResults, setSearchResults] = React.useState({
    selected: humCourses,
    selectedDay: null,
    selectedHour: null,
  });
  const { selected, selectedDay, selectedHour } = searchResults;

  function filterItems(input) {
    let key = input.value;
    let removeCourses = (obj) =>
      Object.keys(obj)
        .filter((item) => obj[item]["sections"]["L1"].sched.length)
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
    let filterCourses = (obj) =>
      Object.keys(obj)
        .filter(
          (item) =>
            obj[item]["sections"]["L1"]["sched"][0].days[0] === key ||
            obj[item]["sections"]["L1"]["sched"][0].hours[0] === key
        )
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
    let filteredlist = removeCourses(searchResults.selected);
    let updatedlist = filterCourses(filteredlist);
    setSearchResults({ selected: updatedlist });
  }
  return (
    <>
      <Select
        value={searchResults.selectedDay}
        onChange={filterItems}
        options={days}
      />
      <Select
        value={searchResults.selectedHour}
        onChange={filterItems}
        options={hours}
      />
      <ListCourse courses={searchResults.selected} />
    </>
  );
};

export default SearchHel;
