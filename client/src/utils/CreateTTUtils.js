import Entry from "../schemas/Entry";
import MyCourse from "../schemas/MyCourse";
const ntw = require("number-to-words");

let hours, days, room;

export const mapDay = {
  M: "Monday",
  T: "Tuesday",
  W: "Wednesday",
  Th: "Thursday",
  F: "Friday",
  S: "Saturday"
};

export const mapSection = { L: "Lecture", T: "Tutorial", P: "Practical" };

export function getSectionDetails(sched) {
  hours = sched.hours;
  days = sched.days;
  room = sched.room;
  return [hours, days, room];
}

function findIndex(courseTemp, courseCode) {
  return courseTemp.findIndex(item => {
    return Object.keys(item.course)[0] === courseCode[0];
  });
}

export function checkClashOrDelete(tt, courseCode, sched) {
  [hours, days, room] = sched;
  for (let day of days) {
    for (let hour of hours) {
      if (tt[day][ntw.toWords(hour)].sectionRoom === room) {
        return "delete";
      } else if (
        String(tt[day][ntw.toWords(hour)].courseCode) === courseCode[0]
      ) {
        return false;
      } else if (tt[day][ntw.toWords(hour)].sectionRoom !== undefined) {
        return true;
      }
    }
  }
  return false;
}

export function checkLunchHour(tt, sched) {
  [hours, days, room] = sched;
  let lunchHours = [4, 5, 6];
  for (let day of days) {
    let temp = lunchHours;
    for (let hour of hours) {
      temp = temp.filter(item => item !== hour);
    }
    if (temp.length === 3) {
      return false;
    }
    let freq = 0;
    for (let hour of temp) {
      if (tt[day][ntw.toWords(hour)].courseCode != null) {
        freq++;
      }
    }
    if (freq === temp.length) {
      return day;
    }
  }
  return false;
}

export function checkSection(courseTemp, courseCode, section) {
  let index = findIndex(courseTemp, courseCode);
  if (index === -1) {
    return false;
  }
  let duplicate = courseTemp[index].sections.find(item => {
    return item.charAt(0) === section.charAt(0);
  });
  if (duplicate) {
    return duplicate;
  }
  return false;
}

export function deleteSection(
  temp,
  courseTemp,
  courseCode,
  sectionDict,
  section
) {
  sectionDict[section].sched.forEach(item => {
    [hours, days, room] = getSectionDetails(item);
    for (let day of days) {
      for (let hour of hours) {
        temp[day][ntw.toWords(hour)] = new Entry();
      }
    }
  });
  let index = findIndex(courseTemp, courseCode);
  let rem = Array.from(
    courseTemp[index].sections.filter(item => {
      return item.charAt(0) !== section.charAt(0);
    })
  );
  if (!rem.length) {
    courseTemp = courseTemp.filter(item => {
      return Object.keys(item.course)[0] !== courseCode[0];
    });
  } else {
    courseTemp[index].sections = rem;
  }
  return [temp, courseTemp];
}

export function updateTT(
  temp,
  courseTemp,
  courseCode,
  current,
  sectionDict,
  section
) {
  sectionDict[section].sched.forEach(item => {
    [hours, days, room] = getSectionDetails(item);
    for (let day of days) {
      for (let hour of hours) {
        let entry = new Entry(
          courseCode,
          current[courseCode].name,
          room,
          hours.length,
          section
        );
        temp[day][ntw.toWords(hour)] = entry;
      }
    }
  });
  if (
    !courseTemp.length ||
    !courseTemp.find(item => {
      return Object.keys(item.course)[0] === courseCode[0];
    })
  ) {
    courseTemp.push(new MyCourse(current, section));
  } else {
    let index = findIndex(courseTemp, courseCode);
    courseTemp[index].sections.push(section);
  }
  return [temp, courseTemp];
}
