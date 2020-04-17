const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LoginSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "student"
  },
  createdAt: { type: Date, expires: "262800m", default: Date.now }
});

module.exports = mongoose.model("login", LoginSchema);
