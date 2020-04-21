const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const helSchema = new Schema({
  courseName: {
    type: String,
    required: true
  },
  studentsInterestedInSlot: {
    type: Map,
    of: Number,
    required: true
  }
});

module.exports = mongoose.model("hels-prevsem", helSchema);
