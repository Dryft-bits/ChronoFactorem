const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseStatsSchema = new Schema({
  courseId: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("course-stats", CourseStatsSchema);
