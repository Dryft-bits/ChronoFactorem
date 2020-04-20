const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LoginSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "student"
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: "262800m" }
  }
});

module.exports = mongoose.model("login", LoginSchema);
