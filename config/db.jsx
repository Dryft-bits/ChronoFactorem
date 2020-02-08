const mongoose = require("mongoose");
const config = require("config");
const mongoURI = config.get("mongoURI");

// Connects to database
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      // Change deprecated settings to resolve warnings
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("LOG: MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
