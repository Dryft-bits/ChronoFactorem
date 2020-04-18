const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProfAuth = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
      type: String, 
      required: true
  },
  department: {
      type: String,
      required: true
  },
  email:  {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("professorAuth", ProfAuth);