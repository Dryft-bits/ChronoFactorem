const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const mongoURI = process.env.mongoURIDev;

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
