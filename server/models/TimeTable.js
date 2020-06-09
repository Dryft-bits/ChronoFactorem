const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TimeTable = require("./schemas/TimeTable");

const TimeTableSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "student"
    },
    name: {
      type: String
    },
    branch:{
      type: Array,
    },
    year:{
      type: Number,
    },
    username:{
      type: String
    },
    TimeTable: {
      type: TimeTable,
      required: true
    },
    Courses: [
      {
        type: Object
      }
    ],
    date: {
      type: Date,
      default: Date.now
    },
    isShared: {
      type: Boolean,
      default: false
    }
  },
  { minimize: false }
);

module.exports = mongoose.model("timetable", TimeTableSchema);
