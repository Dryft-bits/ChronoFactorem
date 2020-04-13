const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  submittedForm: {
    type: Boolean,
    required: true
  },
  year: {
    type: Number
  },
  branch: {
    type: Array
  }
});

module.exports = mongoose.model("student", StudentSchema);
