import React, { Fragment } from "react";
import Search from "../timetable/Search";

const SearchCourse = () => {
  const courses = [
    {
      code: "CS F211",
      name: "DSA",
      lecture: [
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" },
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" }
      ],
      tutorial: [
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" },
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" }
      ],
      lab: [
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" },
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" }
      ],
      midsem: "3 Mar",
      compre: "4 May"
    },
    {
      code: "CS F212",
      name: "OOPS",
      lecture: [
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" },
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" }
      ],
      tutorial: [
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" },
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" }
      ],
      lab: [
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" },
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" }
      ],
      midsem: "3 Mar",
      compre: "4 May"
    }
  ];

  return (
    <Fragment>
      <div className='Courses'>
        <Search items={courses} />
      </div>
    </Fragment>
  );
};

export default SearchCourse;
