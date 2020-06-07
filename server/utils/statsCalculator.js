const CourseStats = require("../models/CourseStats");
const Student = require("../models/Student");

const updateOnSaving = async (studentId, courses) => {
  let studentObj = await Student.findOne({ _id: studentId });
  for (let chosen of courses) {
    let flag = 0;
    let id = Object.keys(chosen.course)[0];
    for (let taken of studentObj.interestedCourses) {
      if (id === taken) {
        flag = 1;
        break;
      }
    }
    if (!flag) {
      studentObj.interestedCourses.push(id);
      let stats = await CourseStats.findOne({ courseId: id });
      if (!stats) {
        stats = new CourseStats({
          courseId: id,
          count: 1,
        });
      } else {
        stats.count++;
      }
      stats.save();
      studentObj.save();
    }
  }
};
const updateOnDeleting = async () => {};
module.exports = {
  updateOnSaving,
  updateOnDeleting,
};
